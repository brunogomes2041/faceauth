
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SignaturePad from "react-signature-canvas";
import { FileText } from "lucide-react";

interface LGPDConsentProps {
  onAccept: () => void;
}

const LGPDConsent = ({ onAccept }: LGPDConsentProps) => {
  const [hasSignature, setHasSignature] = useState(false);
  const [signaturePad, setSignaturePad] = useState<any>(null);

  const clearSignature = () => {
    signaturePad?.clear();
    setHasSignature(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center gap-2 text-xl font-semibold text-gray-900">
        <FileText className="w-6 h-6" />
        <h2>Termo de Consentimento LGPD</h2>
      </div>

      <div className="prose prose-sm max-w-none text-gray-600">
        <p>
          Conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), ao se
          inscrever no Siará Tech Summit, você concorda com a coleta e
          processamento dos seus dados pessoais para:
        </p>
        <ul>
          <li>Confirmação de sua inscrição no evento</li>
          <li>Comunicação sobre informações importantes do evento</li>
          <li>Emissão de certificado de participação</li>
          <li>Registro fotográfico para fins de segurança e identificação</li>
        </ul>
      </div>

      <div className="border rounded-lg p-4 bg-gray-50">
        <div className="mb-4 text-sm text-gray-600">
          Assinatura Digital (assine abaixo):
        </div>
        <div className="border rounded bg-white">
          <SignaturePad
            ref={(ref) => setSignaturePad(ref)}
            onBegin={() => setHasSignature(true)}
            canvasProps={{
              className: "w-full h-[150px]",
            }}
          />
        </div>
        <div className="flex justify-end gap-2 mt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={clearSignature}
            className="text-sm"
          >
            Limpar
          </Button>
        </div>
      </div>

      <Button
        className="w-full transition-all hover:translate-y-[-2px]"
        disabled={!hasSignature}
        onClick={onAccept}
      >
        Aceitar e Continuar
      </Button>
    </div>
  );
};

export default LGPDConsent;
