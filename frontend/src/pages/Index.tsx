import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LGPDConsent from "@/components/LGPDConsent";
import PhotoCapture from "@/components/PhotoCapture";
import RegisterForm from "@/components/RegisterForm";
import SuccessMessage from "@/components/SuccessMessage";
import { toast } from "sonner";
import axios from "axios";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  photo: File | null;
  lgpdSignature: boolean;
};

const Index = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    photo: null,
    lgpdSignature: false,
  });

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleFormSubmission = async () => {
    try {
      if (formData.photo) {
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.fullName);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("phone", formData.phone);
        formDataToSend.append("image", formData.photo);
  
        const response = await axios.post("http://127.0.0.1:5000/register", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",  // Importante para enviar arquivos
          },
        });
  
        if (response.status === 200) {
          toast.success("Registro salvo com sucesso!");
          nextStep();
        } else {
          toast.error("Erro ao salvar registro");
        }
      }
    } catch (error) {
      console.error("Erro ao salvar registro:", error);
      toast.error("Erro ao salvar registro");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Siará Tech Summit</h1>
          <p className="text-gray-600">Formulário de Inscrição</p>
        </div>

        <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-xl border-0">
          {step === 1 && (
            <LGPDConsent
              onAccept={() => {
                setFormData((prev) => ({ ...prev, lgpdSignature: true }));
                nextStep();
              }}
            />
          )}

          {step === 2 && (
            <RegisterForm
              formData={formData}
              setFormData={setFormData}
              onNext={nextStep}
            />
          )}

          {step === 3 && (
            <div className="space-y-6">
              <PhotoCapture
                onPhotoCapture={(file: File) => {
                  setFormData((prev) => ({ ...prev, photo: file }));
                }}
              />
              {formData.photo && (
                <Button 
                  onClick={handleFormSubmission}
                  className="w-full transition-all hover:translate-y-[-2px]"
                >
                  Enviar Registro
                </Button>
              )}
            </div>
          )}

          {step === 4 && <SuccessMessage />}

          <div className="flex justify-between mt-6">
            {step > 1 && step < 4 && (
              <Button
                variant="outline"
                onClick={prevStep}
                className="transition-all hover:translate-x-[-4px]"
              >
                Voltar
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;