
import CertificationForm from "@/components/CertificationForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="mt-6 text-3xl font-bold text-industrial-900">
            Seam Weld Certification System
          </h2>
          <p className="mt-2 text-industrial-600">
            Complete the form below to start a new certification process
          </p>
        </div>
        <CertificationForm />
      </div>
    </div>
  );
};

export default Index;
