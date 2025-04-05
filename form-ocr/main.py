from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import os
import io
import uvicorn
import logging
from typing import List, Dict, Union
from PIL import Image

# Import from local modules
from ocr_extraction import (
    pdf_to_images,
    extract_text_from_image,
    extract_fields,
    export_to_excel,
    export_to_pdf
)
from form_classification import identify_form_type

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.post("/upload/")
async def upload_files(files: Union[List[UploadFile], UploadFile] = File(...)):
    if isinstance(files, UploadFile):
        files = [files]
    
    extracted_data_list = []
    
    try:
        for file in files:
            file_content = await file.read()
            
            # Handle PDF and image files
            if file.filename.lower().endswith(".pdf"):
                images = pdf_to_images(file_content)
            else:
                images = [Image.open(io.BytesIO(file_content))]
            
            # Extract text from all pages
            full_text = " ".join([extract_text_from_image(img) for img in images])
            logger.info(f"""🧾 OCR RAW TEXT for {file.filename}:
{full_text}""")

            
            # Identify form type
            form_type = identify_form_type(full_text)
            if form_type == "Unknown":
                raise HTTPException(status_code=400, detail=f"Form type not recognized for file: {file.filename}")
            
            # Extract fields
            extracted_data = extract_fields(full_text, form_type)
            extracted_data_list.append({file.filename: extracted_data})
        
        # Generate downloadable files
        excel_path = os.path.join(UPLOAD_FOLDER, "bulk_extracted_data.xlsx")
        pdf_path = os.path.join(UPLOAD_FOLDER, "bulk_extracted_data.pdf")
        
        export_to_excel(extracted_data_list, excel_path)
        export_to_pdf(extracted_data_list, pdf_path)
        
        return {
            "message": "Data extracted successfully",
            "extracted_data": extracted_data_list,
            "download_links": {
                "excel": f"/download/excel",
                "pdf": f"/download/pdf"
            }
        }
    
    except Exception as e:
        logger.error(f"❌ Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/download/{file_type}")
def download_file(file_type: str):
    if file_type not in ["excel", "pdf"]:
        raise HTTPException(status_code=400, detail="Invalid download type.")
    
    filename = "bulk_extracted_data.xlsx" if file_type == "excel" else "bulk_extracted_data.pdf"
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    
    if not os.path.exists(filepath):
        raise HTTPException(status_code=404, detail=f"{filename} not found.")
    
    return FileResponse(filepath, media_type="application/octet-stream", filename=filename)

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)