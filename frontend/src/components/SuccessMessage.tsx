
import { Check } from "lucide-react";

const SuccessMessage = () => {
  return (
    <div className="text-center py-8 space-y-4 animate-fadeIn">
      <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
        <Check className="w-6 h-6 text-green-600" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-900">
        Inscrição Realizada!
      </h2>
      <p className="text-gray-600">
        Sua inscrição para o Siará Tech Summit foi realizada com sucesso.
        Enviaremos um email com mais informações em breve.
      </p>
    </div>
  );
};

export default SuccessMessage;
