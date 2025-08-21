"use client";

import React, { useState, useRef } from "react";
import { FiUpload, FiDollarSign, FiArrowRight, FiX } from "react-icons/fi";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";

export default function SalaryEstimator() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedProfileId, setUploadedProfileId] = useState<string | null>(
    null
  );
  const [location, setLocation] = useState("");
  const [customLocation, setCustomLocation] = useState("");
  const [isEstimating, setIsEstimating] = useState(false);
  const [salaryResult, setSalaryResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const popularLocations = [
    "New York, USA",
    "San Francisco, USA",
    "London, UK",
    "Berlin, Germany",
    "Toronto, Canada",
    "Sydney, Australia",
    "Singapore",
    "Bangalore, India",
    "Remote",
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setSalaryResult(null);
      setUploadedProfileId(null);
      setError(null);
    }
  };

  const handleLocationSelect = (loc: string) => {
    setLocation(loc);
    setCustomLocation("");
  };

  const handleFileUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("isLinkedInProfile", "true"); // Hint that this is a LinkedIn profile

    try {
      const response = await fetch("/api/rag-system/ingest", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload profile");
      }

      const result = await response.json();
      if (result.success) {
        setUploadedProfileId(result.documentId);
        // Add document to session storage
        const savedUserDocs = sessionStorage.getItem("rag-system-documents");
        const userDocs = savedUserDocs ? JSON.parse(savedUserDocs) : [];
        const newDoc = {
          id: result.documentId,
          name: file.name,
          size: file.size,
          type: "LinkedIn Profile",
          uploadedAt: new Date().toISOString(),
          chunks: result.totalChunks,
          pages: result.totalPages,
        };
        sessionStorage.setItem(
          "rag-system-documents",
          JSON.stringify([...userDocs, newDoc])
        );
      } else {
        throw new Error(result.error || "Unknown error");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setError("Failed to upload LinkedIn profile. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const requestSalaryEstimate = async () => {
    if (!uploadedProfileId) return;

    const targetLocation = location || customLocation;
    if (!targetLocation) {
      setError("Please select or enter a location");
      return;
    }

    setIsEstimating(true);
    setSalaryResult(null);
    setError(null);

    try {
      const response = await fetch("/api/rag-system/salary-estimate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profileId: uploadedProfileId,
          location: targetLocation,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get salary estimate");
      }

      const result = await response.json();
      setSalaryResult(result.salaryEstimate);
    } catch (error) {
      console.error("Estimation error:", error);
      setError("Failed to generate salary estimate. Please try again.");
    } finally {
      setIsEstimating(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setUploadedProfileId(null);
    setSalaryResult(null);
    setError(null);
    setLocation("");
    setCustomLocation("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <PageLayout mainClassName="max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/20">
            <FiDollarSign className="text-white text-xl" />
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-500">
            Salary Estimator
          </h1>
        </div>
        <Link
          href="/rag-system"
          className="flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-[#353945] text-gray-300 hover:bg-[#4a4f5e] transition-colors hover:shadow-md hover:shadow-red-500/10"
        >
          <span>Back to RAG System</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="p-4 rounded-xl bg-gradient-to-b from-[#0f1117] via-[#181a20] to-[#1a1d23] border border-[#353945]">
          <h2 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-500">
            How It Works
          </h2>
          <p className="text-gray-300 mb-3">
            Our salary estimator uses AI to analyze your LinkedIn profile and
            provide a salary range based on your skills and target location.
          </p>
          <div className="mt-4 border-t border-[#4a4f5e] pt-3">
            <h3 className="text-md font-semibold mb-2 text-red-400">
              Get your personalized salary estimate:
            </h3>
            <ol className="list-decimal list-inside text-sm text-gray-300 space-y-1">
              <li>Upload your LinkedIn profile PDF</li>
              <li>Select your target job location</li>
              <li>
                Get a salary range estimate based on your skills and experience
              </li>
              <li>
                Receive personalized insights to increase your earning potential
              </li>
            </ol>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-b from-[#0f1117] via-[#181a20] to-[#1a1d23] border border-[#353945] flex flex-col">
          <h2 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-500">
            Upload Your LinkedIn Profile
          </h2>

          {!file ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#353945] rounded-lg cursor-pointer hover:border-red-500 transition-colors"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf"
                className="hidden"
              />
              <FiUpload className="text-4xl text-gray-400 mb-3" />
              <p className="text-gray-300 text-center">
                Click to upload your LinkedIn profile PDF
              </p>
              <p className="text-gray-500 text-sm text-center mt-2">
                Only PDF files are supported
              </p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4 p-3 bg-[#262938] rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-red-500/20 rounded-lg mr-3">
                    <FiUpload className="text-red-500" />
                  </div>
                  <div className="truncate">
                    <p className="text-white truncate max-w-[200px]">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={resetForm}
                  className="p-1 rounded-full hover:bg-[#353945]"
                >
                  <FiX className="text-gray-400" />
                </button>
              </div>

              {!uploadedProfileId && (
                <button
                  onClick={handleFileUpload}
                  disabled={isUploading}
                  className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed mt-2 flex items-center justify-center shadow-md shadow-red-500/10"
                >
                  {isUploading ? (
                    <div className="flex items-center">
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Uploading...
                    </div>
                  ) : (
                    "Upload Profile"
                  )}
                </button>
              )}

              {uploadedProfileId && (
                <div className="mt-4">
                  <h3 className="text-md font-semibold mb-2 text-red-400">
                    Select Target Location
                  </h3>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {popularLocations.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => handleLocationSelect(loc)}
                        className={`text-sm py-1 px-2 rounded-lg ${
                          location === loc
                            ? "bg-red-600 text-white shadow-sm shadow-red-500/20"
                            : "bg-[#262938] text-gray-300 hover:bg-[#353945]"
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Or enter custom location..."
                      value={customLocation}
                      onChange={(e) => {
                        setCustomLocation(e.target.value);
                        setLocation("");
                      }}
                      className="w-full bg-[#262938] border border-[#353945] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <button
                    onClick={requestSalaryEstimate}
                    disabled={isEstimating || (!location && !customLocation)}
                    className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-md shadow-red-500/10"
                  >
                    {isEstimating ? (
                      <div className="flex items-center">
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        Estimating...
                      </div>
                    ) : (
                      <>
                        Generate Salary Estimate{" "}
                        <FiArrowRight className="ml-2" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Salary Result Section */}
      {salaryResult && (
        <div className="p-6 rounded-xl bg-gradient-to-b from-[#0f1117] via-[#181a20] to-[#1a1d23] border border-[#353945] mt-6">
          <h2 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-500 flex items-center">
            <FiDollarSign className="mr-2" /> Your Salary Estimate
          </h2>
          <div className="prose prose-invert max-w-none">
            <div
              dangerouslySetInnerHTML={{
                __html: salaryResult.replace(/\n/g, "<br/>"),
              }}
            />
          </div>
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-300 text-sm">
              <strong>Note:</strong> This estimate is based on current market
              trends and the information provided in your LinkedIn profile.
              Actual salaries may vary based on company size, specific
              requirements, negotiation, and other factors.
            </p>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
