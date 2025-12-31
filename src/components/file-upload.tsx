"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { UploadCloud, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { formatBytes } from "@/lib/utils";
import Image from "next/image";

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

interface FileUploadButtonProps {
    storageUsed: number;
    storageLimit: number;
}

export default function FileUploadButton({ storageUsed, storageLimit }: FileUploadButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setError(null);
    if (rejectedFiles.length > 0) {
        if(rejectedFiles[0].errors[0].code === 'file-too-large') {
            setError(`File is too large. Max size is ${formatBytes(MAX_FILE_SIZE)}.`);
        } else {
            setError(rejectedFiles[0].errors[0].message);
        }
        return;
    }
    
    if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (storageUsed + file.size > storageLimit) {
            setError("Not enough storage space.");
            return;
        }
        setFileToUpload(file);
        if (file.type.startsWith("image/")) {
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview(null);
        }
    }
  }, [storageLimit, storageUsed]);

  useEffect(() => {
    return () => {
        if (preview) {
            URL.revokeObjectURL(preview);
        }
    }
  }, [preview]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
  });
  
  const handleUpload = async () => {
    if (!fileToUpload || !user || !CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      setError("Cloudinary configuration is missing.");
      return;
    }
    
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', fileToUpload);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`, true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        setUploadProgress(progress);
      }
    };

    xhr.onload = async () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const response = JSON.parse(xhr.responseText);
        
        await addDoc(collection(db, "files"), {
          ownerId: user.uid,
          name: fileToUpload.name,
          type: fileToUpload.type,
          size: fileToUpload.size,
          cloudinaryPublicId: response.public_id,
          resourceType: response.resource_type,
          downloadURL: response.secure_url,
          createdAt: serverTimestamp(),
        });
        
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, {
            storageUsed: storageUsed + fileToUpload.size
        });

        setUploading(false);
        setIsOpen(false);
        setFileToUpload(null);
        setUploadProgress(0);
        toast({
            title: "Upload Complete",
            description: `"${fileToUpload.name}" has been successfully uploaded.`,
        });
      } else {
        console.error("Upload error:", xhr.responseText);
        setError("Upload failed. Please try again.");
        setUploading(false);
        toast({
            variant: "destructive",
            title: "Upload Failed",
            description: "There was an error uploading your file."
        })
      }
    };

    xhr.onerror = () => {
      console.error("Upload error:", xhr.statusText);
      setError("Upload failed. Please try again.");
      setUploading(false);
      toast({
          variant: "destructive",
          title: "Upload Failed",
          description: "There was an error uploading your file."
      })
    };

    xhr.send(formData);
  };
  
  const resetState = () => {
    setIsOpen(false);
    setTimeout(() => {
        setFileToUpload(null);
        setError(null);
        setUploading(false);
        setUploadProgress(0);
        if(preview) {
            URL.revokeObjectURL(preview);
            setPreview(null);
        }
    }, 300);
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <UploadCloud className="mr-2 h-4 w-4" />
        Upload File
      </Button>
      <Dialog open={isOpen} onOpenChange={ (open) => { if(!open) resetState() } }>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload a File</DialogTitle>
            <DialogDescription>
              Drag and drop a file or click to select. Max file size: 100MB.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            {!fileToUpload && !uploading && (
                <div
                {...getRootProps()}
                className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                    isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                }`}
                >
                <input {...getInputProps()} />
                <UploadCloud className="h-10 w-10 text-muted-foreground mb-2"/>
                <p className="text-sm text-muted-foreground">
                    {isDragActive ? 'Drop the file here...' : 'Drag & drop a file, or click to select'}
                </p>
                </div>
            )}

            {fileToUpload && !uploading && (
                 <div className="space-y-4">
                    {preview && (
                        <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                            <Image src={preview} alt="File preview" layout="fill" objectFit="contain" />
                        </div>
                    )}
                    <div className="flex items-center justify-between p-2 border rounded-lg bg-muted/50">
                        <span className="font-medium truncate text-sm">{fileToUpload.name}</span>
                        <span className="text-sm text-muted-foreground ml-2">{formatBytes(fileToUpload.size)}</span>
                    </div>
                </div>
            )}
            
            {uploading && fileToUpload && (
                <div className="space-y-2">
                    <p className="text-sm font-medium">{`Uploading ${fileToUpload.name}...`}</p>
                    <Progress value={uploadProgress} className="w-full" />
                    <p className="text-sm text-muted-foreground text-right">{`${Math.round(uploadProgress)}%`}</p>
                </div>
            )}

            {error && (
                <div className="flex items-center gap-2 text-destructive text-sm mt-2 p-2 bg-destructive/10 rounded-md">
                    <AlertCircle className="h-4 w-4"/>
                    <span>{error}</span>
                </div>
            )}
            
            {!uploading && fileToUpload && (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-500 text-sm mt-2 p-2 bg-green-500/10 rounded-md">
                    <CheckCircle2 className="h-4 w-4"/>
                    <span>File ready to upload.</span>
                </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={resetState} disabled={uploading}>Cancel</Button>
            <Button onClick={handleUpload} disabled={!fileToUpload || uploading}>
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
