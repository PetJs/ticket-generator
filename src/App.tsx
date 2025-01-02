import { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import patterLine from "./assets/images/pattern-lines.svg";
import patternTop from "./assets/images/pattern-squiggly-line-top.svg";
import patternCircle from "./assets/images/pattern-circle.svg";
import patternBottom from "./assets/images/pattern-squiggly-line-bottom.svg";
import Logo from "./assets/images/logo-mark.svg";
import iconUpload from "./assets/images/icon-upload.svg"
import './App.css';

interface FileWithPreview extends File {
  preview: string;
}

function App() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    setFiles((prevFiles) => [
      ...prevFiles, 
      ...acceptedFiles.map(file => 
          Object.assign(file, { preview: URL.createObjectURL(file)})
        ),
      ]
    );

    if(fileRejections.length > 0){
      setError("File too large. Please upload a photo under 500kb")
    }
  }, []);

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/gif': []
    }, // Allow only image files
    maxSize: 500000, // 500 KB (500,000 bytes)
    multiple: false
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle file upload logic here if needed
    console.log("Files ready to be uploaded:", files);
  };

  return (
    <div className="relative h-screen bg-[url('./assets/images/background-desktop.png')] bg-cover bg-center overflow-hidden">
      <div>
        <img src={patternCircle} alt="" className="relative md:w-32 w-20 md:ml-6 md:-top-12 -top-6 md:left-0 -left-3" />
        <img src={patterLine} className="absolute inset-0" />
        <img src={patternTop} className="absolute top-6 right-0 mt md:w-80 w-28 " />
        <img src={patternCircle} alt="" className="absolute md:right-32 -right-10 md:w-32 w-20 md:mt-64 mt-36 " />
        <img src={patternBottom} alt="" className="absolute bottom-0 w-96 " />
      </div>
      <div className="flex text-white absolute top-0 left-1/2 transform -translate-x-1/2 mt-8 gap-4">
        <img src={Logo} alt="" />
        <h2 className="font-inconsolata font-semibold md:text-xl text-lg">Coding Conf</h2>
      </div>
      <div className="text-white flex flex-col justify-center items-center font-inconsolata m-4">
        <h1 className="md:text-5xl text-2xl max-w-2xl mx-auto text-center font-semibold">
          Your Journey to Coding Conf 2025 Starts Here!
        </h1>
        <p className="max-w-2xl mx-auto text-center">
          Secure your spot at next year's biggest coding conference
        </p>
      </div>
      <form onSubmit={handleSubmit} className="text-white relative border flex justify-center w-80 absolute left-1/2 transform -translate-x-1/2 p-3">
        <div className="w-full">
          <p>Upload Avatar</p>
          <div {...getRootProps()} className="cursor-pointer bg-gray-700 opacity-50 rounded border-dashed border-2 p-2">
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <div className="flex flex-col items-center">
                <img src={iconUpload} alt="" className="w-12"/>
                <p>Drag and drop or click to upload</p>
              </div>
            )}
          </div>
          <ul>
            {files.map((file) => (
              <li key={file.name}><img src={file.preview} alt="" /></li>
            ))}
          </ul>
          <div>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet neque voluptas placeat consequatur cum quisquam blanditiis unde totam! Aliquam quisquam natus voluptatum mollitia doloremque! Distinctio aspernatur a illum nesciunt nemo?
          </div>
        </div>
        
      </form>
    </div>
  );
}

export default App;
