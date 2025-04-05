import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BankAccount = () => {
  const [extractedData, setExtractedData] = useState<any>(null);
  const [isBulkMode, setIsBulkMode] = useState<boolean>(false);
  const { toast } = useToast();

  const handleFileProcessed = (data: any) => {
    console.log("🔍 Extracted Data:", data);
    setExtractedData(data);
  };

  const handleDownload = (format: "excel" | "pdf") => {
    if (!extractedData) {
      toast({
        title: "No data to download",
        description: "Please process files first to extract data.",
        variant: "destructive",
      });
      return;
    }

    const fileUrl =
      format === "pdf"
        ? "http://127.0.0.1:8000/uploads/bulk_extracted_data.pdf"
        : "http://127.0.0.1:8000/uploads/bulk_extracted_data.xlsx";

    window.open(fileUrl, "_blank");

    toast({
      title: `Downloading ${format.toUpperCase()} file`,
      description: `Your formatted data is being downloaded.`,
    });
  };

  const toggleBulkMode = () => {
    setIsBulkMode(!isBulkMode);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-24 flex-grow section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center mb-2">
              <div className="w-1 h-6 bg-primary_green rounded-full mr-3"></div>
              <h1 className="text-3xl font-display font-bold">
                Bank Account Opening
              </h1>
            </div>
            <p className="text-light_text/70 ml-4">
              Streamline the account opening process by extracting data from
              application forms.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-card p-6">
              <FileUpload
                onFileProcessed={handleFileProcessed}
                isBulkMode={isBulkMode}
                toggleBulkMode={toggleBulkMode}
              />
            </div>

            <div className="glass-card p-6 flex flex-col">
              <h3 className="text-lg font-semibold text-light_text mb-4">
                Extracted Data
              </h3>
              <div className="bg-white/5 rounded-lg border border-white/10 p-4 mb-4 overflow-auto">
                {extractedData ? (
                  <div className="space-y-4">
                    {extractedData.map((fileData: any, index: number) => (
                      <div key={index}>
                        <h4 className="text-md font-bold text-primary_green">
                          {Object.keys(fileData)[0]}
                        </h4>
                        <div className="border-b border-white/10 my-2"></div>
                        {Object.entries(fileData).map(
                          ([filename, formData]: any) => (
                            <div key={filename} className="p-2">
                              {Object.entries(formData).map(
                                ([category, fields]: any) => (
                                  <div key={category} className="mb-4">
                                    <h5 className="font-semibold text-light_text">
                                      {category}
                                    </h5>
                                    <div className="border-b border-white/10 my-1"></div>
                                    {Object.entries(fields).map(
                                      ([key, value]: any, i) => (
                                        <p
                                          key={i}
                                          className="text-light_text text-sm"
                                        >
                                          <span className="font-semibold">
                                            {key}:
                                          </span>{" "}
                                          {String(value)}
                                        </p>
                                      )
                                    )}
                                  </div>
                                )
                              )}
                            </div>
                          )
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-light_text/50">
                    Upload and process files to view extracted data
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => handleDownload("excel")}
                  disabled={!extractedData}
                  className="bg-primary_green hover:bg-primary_green/90 text-white"
                >
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Download Excel
                </Button>

                <Button
                  onClick={() => handleDownload("pdf")}
                  disabled={!extractedData}
                  variant="outline"
                  className="bg-transparent border-white/20 hover:bg-white/5"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BankAccount;
