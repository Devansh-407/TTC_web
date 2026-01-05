"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, Phone, Mail, Eye } from "lucide-react"

interface FormData {
  occasion: string
  budgetRange: string
  ageGroup: string
  timeline: string
  description: string
  referenceImages: File[]
}

const steps = [
  { id: 1, title: "Requirements", description: "Tell us about your needs" },
  { id: 2, title: "Design & Materials", description: "Choose your preferences" },
  { id: 3, title: "Personalization", description: "Add personal touches" },
  { id: 4, title: "Review & Submit", description: "Confirm your order" },
]

export function CustomOrderForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    occasion: "",
    budgetRange: "",
    ageGroup: "",
    timeline: "",
    description: "",
    referenceImages: [],
  })

  const [estimatedPrice, setEstimatedPrice] = useState(19500) // ₹19,500 in INR
  const [estimatedDelivery, setEstimatedDelivery] = useState("March 15, 2025")

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-12">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-base font-bold ${
                  currentStep === step.id 
                    ? "bg-purple-500 text-white" 
                    : currentStep > step.id
                    ? "bg-purple-300 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {step.id}
              </div>
              <div className="text-center mt-2">
                <div className={`text-sm font-medium ${currentStep === step.id ? "text-purple-500" : "text-gray-600"}`}>
                  {step.title}
                </div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-20 h-0.5 mx-4 ${currentStep > step.id ? "bg-purple-500" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                {currentStep === 1 && "Gift Requirements"}
                {currentStep === 2 && "Design & Materials"}
                {currentStep === 3 && "Personalization Details"}
                {currentStep === 4 && "Review Your Order"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentStep === 1 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="occasion">Occasion</Label>
                      <Select
                        value={formData.occasion}
                        onValueChange={(value) => setFormData({ ...formData, occasion: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select an occasion" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wedding">Wedding</SelectItem>
                          <SelectItem value="anniversary">Anniversary</SelectItem>
                          <SelectItem value="birthday">Birthday</SelectItem>
                          <SelectItem value="graduation">Graduation</SelectItem>
                          <SelectItem value="baby-shower">Baby Shower</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="budget">Budget Range</Label>
                      <Select
                        value={formData.budgetRange}
                        onValueChange={(value) => setFormData({ ...formData, budgetRange: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1000-3000">₹1,000 - ₹3,000</SelectItem>
                          <SelectItem value="3000-8000">₹3,000 - ₹8,000</SelectItem>
                          <SelectItem value="8000-15000">₹8,000 - ₹15,000</SelectItem>
                          <SelectItem value="15000+">₹15,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="age-group">Recipient Age Group</Label>
                      <Select
                        value={formData.ageGroup}
                        onValueChange={(value) => setFormData({ ...formData, ageGroup: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select age group" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="child">Child (0-12)</SelectItem>
                          <SelectItem value="teen">Teen (13-17)</SelectItem>
                          <SelectItem value="adult">Adult (18-64)</SelectItem>
                          <SelectItem value="senior">Senior (65+)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="timeline">Desired Timeline</Label>
                      <Select
                        value={formData.timeline}
                        onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-week">1 Week</SelectItem>
                          <SelectItem value="2-weeks">2 Weeks</SelectItem>
                          <SelectItem value="1-month">1 Month</SelectItem>
                          <SelectItem value="2-months">2+ Months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Gift Purpose & Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what you're looking for, the story behind the gift, and any specific requirements..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label>Reference Images (Optional)</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-600 mb-2">Drag and drop images here, or click to browse</p>
                      <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                      <Button variant="outline" className="mt-4 bg-transparent">
                        Choose Files
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Design & Materials Selection</h3>
                  <p className="text-gray-600 mb-8">
                    Our design team will work with you to select the perfect materials and create detailed mockups based
                    on your requirements.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl">🎨</span>
                      </div>
                      <h4 className="font-medium">Design Consultation</h4>
                      <p className="text-sm text-gray-600">Work with our designers</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl">🪵</span>
                      </div>
                      <h4 className="font-medium">Material Selection</h4>
                      <p className="text-sm text-gray-600">Choose premium materials</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl">✏️</span>
                      </div>
                      <h4 className="font-medium">Mockup Creation</h4>
                      <p className="text-sm text-gray-600">See before we create</p>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Personalization Options</h3>
                  <p className="text-gray-600 mb-8">
                    Add personal touches like engravings, custom messages, or special details that make your gift truly
                    unique.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl">✍️</span>
                      </div>
                      <h4 className="font-medium">Custom Engraving</h4>
                      <p className="text-sm text-gray-600">Names, dates, messages</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl">🎁</span>
                      </div>
                      <h4 className="font-medium">Special Packaging</h4>
                      <p className="text-sm text-gray-600">Beautiful gift presentation</p>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900">Order Summary</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Occasion:</span>
                      <span className="font-medium">{formData.occasion || "Not specified"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Budget Range:</span>
                      <span className="font-medium">{formData.budgetRange || "Not specified"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Timeline:</span>
                      <span className="font-medium">{formData.timeline || "Not specified"}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600 mb-4">
                      By submitting this form, you agree to receive communications from our design team about your
                      custom order. We'll contact you within 24 hours to discuss your project.
                    </p>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">
                        I agree to receive communications from The Tohfa Creations about my custom order and related
                        products or services.
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => {}} 
                  className="text-gray-600 border-gray-300 hover:bg-gray-50"
                >
                  Save Draft
                </Button>

                {currentStep < 4 ? (
                  <Button onClick={handleNext} className="bg-purple-500 hover:bg-purple-600 text-white">
                    Next Step
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} className="bg-purple-500 hover:bg-purple-600 text-white">
                    Submit Order
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Live Estimate */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Live Estimate</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <div className="text-4xl font-bold text-gray-900 mb-2">₹{estimatedPrice.toLocaleString('en-IN')}</div>
                <div className="text-sm text-gray-600 mb-6">Estimated Total</div>

                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-600">Estimated Delivery:</span>
                    <div className="font-medium text-gray-900 mt-1">{estimatedDelivery}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Rush Available:</span>
                    <div className="text-green-600 font-medium mt-1">Yes (+₹3,750)</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Need Help */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Phone className="w-4 h-4 mr-2" />
                Call us: +91 (555) 123-4567
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Mail className="w-4 h-4 mr-2" />
                Email support
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Eye className="w-4 h-4 mr-2" />
                View FAQ
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
