# 📌 form_classification.py
# This file contains the logic to classify form types.

def identify_form_type(text):
    """
    Identifies the form type based on keywords present in the extracted text.
    Returns one of: "Biodata", "Admission", "Bank Account", or "Unknown".
    """

    # Convert text to lowercase for better matching
    text = text.lower()

    # Define keywords for each form type
    if "biodata form" in text or "personal information" in text and "hobbies" in text:
        return "Biodata"
    
    elif "admission form" in text or "course applied" in text or "preferred stream" in text:
        return "Admission"
    
    elif "bank account form" in text or "type of account" in text or "branch" in text:
        return "Bank Account"
    
    else:
        return "Unknown"
