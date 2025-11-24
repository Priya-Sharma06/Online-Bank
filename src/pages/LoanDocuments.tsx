import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, CheckCircle, X } from "lucide-react";

const LoanDocuments = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [documents, setDocuments] = useState({
    pan: null as File | null,
    salary: null as File | null,
    id: null as File | null,
  });

  const handleFileChange = (type: keyof typeof documents, file: File | null) => {
    setDocuments(prev => ({ ...prev, [type]: file }));
  };

  const handleSubmit = () => {
    if (!documents.pan || !documents.salary || !documents.id) {
      toast({
        title: "Missing Documents",
        description: "Please upload all required documents",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Documents Uploaded Successfully",
      description: "Your loan application is now under review",
    });
    
    setTimeout(() => {
      navigate("/loan/status");
    }, 1500);
  };

  const DocumentUploadCard = ({
    title,
    description,
    type,
    file,
  }: {
    title: string;
    description: string;
    type: keyof typeof documents;
    file: File | null;
  }) => (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="w-5 h-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {!file ? (
          <label className="block">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-muted/50 cursor-pointer transition-colors">
              <Upload className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm font-medium mb-1">Click to upload</p>
              <p className="text-xs text-muted-foreground">
                PDF, JPG or PNG (Max 5MB)
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileChange(type, e.target.files?.[0] || null)}
            />
          </label>
        ) : (
          <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-success" />
              <div>
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFileChange(type, null)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">Document Upload</h1>
            <p className="text-muted-foreground">
              Upload required documents to complete your loan application
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8 animate-scale-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium">Application Form</span>
              </div>
              <div className="flex-1 h-1 bg-primary mx-4" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <span className="text-sm font-medium">Document Upload</span>
              </div>
              <div className="flex-1 h-1 bg-muted mx-4" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground text-sm font-bold">3</span>
                </div>
                <span className="text-sm text-muted-foreground">Review</span>
              </div>
            </div>
          </div>

          {/* Document Upload Cards */}
          <div className="space-y-6 mb-8 animate-scale-in">
            <DocumentUploadCard
              title="PAN Card"
              description="Upload a clear copy of your PAN card"
              type="pan"
              file={documents.pan}
            />

            <DocumentUploadCard
              title="Salary Slip / Income Proof"
              description="Latest 3 months salary slips or income tax returns"
              type="salary"
              file={documents.salary}
            />

            <DocumentUploadCard
              title="Identity Proof"
              description="Aadhaar Card, Passport, or Voter ID"
              type="id"
              file={documents.id}
            />
          </div>

          {/* Important Notes */}
          <Card className="mb-8 border-accent/50 bg-accent/5">
            <CardHeader>
              <CardTitle className="text-lg">Important Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  All documents should be clearly visible and readable
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  Maximum file size: 5MB per document
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  Accepted formats: PDF, JPG, PNG
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  Make sure all documents are valid and not expired
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/loan/apply")}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              size="lg"
              onClick={handleSubmit}
              className="flex-1"
            >
              Submit Application
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDocuments;
