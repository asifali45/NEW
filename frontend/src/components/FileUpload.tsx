import axios from "axios";
import React, { useState, useRef } from "react";
import { Upload, X, FileText, FileImage, File, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileProcessed: (text: string) => void;
  isBulkMode?: boolean;
  toggleBulkMode?: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileProcessed,
  isBulkMode = false,
  toggleBulkMode,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const ACCEPTED_TYPES = [
    "application/pdf", 
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", 
    "image/png", 
    "image/jpeg"
  ];
  
  const fileTypeIcons: Record<string, React.ReactNode> = {
    "application/pdf": <FileText className="w-5 h-5 text-red-400" />,
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": <FileText className="w-5 h-5 text-blue-400" />,
    "image/png": <FileImage className="w-5 h-5 text-green-400" />,
    "image/jpeg": <FileImage className="w-5 h-5 text-yellow-400" />,
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    
    const newFiles = Array.from(event.target.files);
    
    // Validate file types
    const invalidFiles = newFiles.filter(file => !ACCEPTED_TYPES.includes(file.type));
    if (invalidFiles.length > 0) {
      toast({
        title: "Invalid file type",
        description: "Please upload PDF, DOCX, PNG, or JPG files only.",
        variant: "destructive",
      });
      return;
    }
    
    if (isBulkMode) {
      setFiles([...files, ...newFiles]);
    } else {
      setFiles([newFiles[0]]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    
    const newFiles = Array.from(e.dataTransfer.files);
    
    // Validate file types
    const invalidFiles = newFiles.filter(file => !ACCEPTED_TYPES.includes(file.type));
    if (invalidFiles.length > 0) {
      toast({
        title: "Invalid file type",
        description: "Please upload PDF, DOCX, PNG, or JPG files only.",
        variant: "destructive",
      });
      return;
    }
    
    if (isBulkMode) {
      setFiles([...files, ...newFiles]);
    } else {
      setFiles([newFiles[0]]);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const processFiles = async () => {
    if (files.length === 0) {
        alert("Please select at least one file.");
        return;
    }

    setProcessing(true);

    const formData = new FormData();
    files.forEach((file) => {
        formData.append("files", file);
    });

    try {
        const response = await axios.post("http://127.0.0.1:8000/upload/", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("🔍 API Response:", response.data); // ✅ Debugging log

        if (response.data.extracted_data && response.data.extracted_data.length > 0) {
            onFileProcessed(response.data.extracted_data);  // ✅ Send extracted data to parent component
            toast({
                title: "Processing Complete",
                description: "File processed successfully.",
            });
        } else {
            toast({
                title: "Processing Error",
                description: "No extracted data found.",
                variant: "destructive",
            });
        }
    } catch (error) {
        console.error("⚠️ OCR Processing Error:", error.response ? error.response.data : error.message);
        toast({
            title: "Error Processing File",
            description: "Something went wrong. Please try again.",
            variant: "destructive",
        });
    }

    setProcessing(false);
};





  const getFileIcon = (file: File) => {
    return fileTypeIcons[file.type] || <File className="w-5 h-5 text-gray-400" />;
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-light_text">Upload Files</h3>
        {toggleBulkMode && (
          <Button 
            variant="outline" 
            onClick={toggleBulkMode}
            className="text-xs bg-transparent border-white/20 hover:bg-white/5"
          >
            {isBulkMode ? "Single Upload" : "Bulk Upload"}
            {isBulkMode && <Plus className="ml-1 w-3 h-3" />}
          </Button>
        )}
      </div>
      
      <div 
        className={cn(
          "border-2 border-dashed rounded-xl p-6 transition-all duration-300 text-center",
          dragging 
            ? "border-primary_green bg-primary_green/5" 
            : "border-white/20 hover:border-white/30",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple={isBulkMode}
          accept=".pdf,.docx,.png,.jpg,.jpeg"
        />
        
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-primary_green/20 flex items-center justify-center">
            <Upload className="w-6 h-6 text-primary_green" />
          </div>
          <div className="space-y-1">
            <p className="text-light_text font-medium">
              {isBulkMode ? 'Upload multiple files' : 'Upload a file'}
            </p>
            <p className="text-light_text/60 text-sm">
              Drag & drop or click to browse
            </p>
            <p className="text-light_text/60 text-xs">
              PDF, DOCX, PNG, JPG (Max 10MB)
            </p>
          </div>
        </div>
      </div>
      
      {files.length > 0 && (
        <div className="space-y-3">
          <div className="grid gap-2 max-h-60 overflow-y-auto pr-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex items-center space-x-3">
                  {getFileIcon(file)}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-light_text truncate max-w-[200px]">
                      {file.name}
                    </span>
                    <span className="text-xs text-light_text/60">
                      {(file.size / 1024).toFixed(2)} KB
                    </span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="text-light_text/60 hover:text-light_text transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setFiles([])}
              className="bg-transparent border-white/20 hover:bg-white/5"
              disabled={processing}
            >
              Clear All
            </Button>
            <Button
              onClick={processFiles}
              className="bg-primary_green hover:bg-primary_green/90 text-white"
              disabled={processing}
            >
              {processing ? "Processing..." : "Process Files"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
