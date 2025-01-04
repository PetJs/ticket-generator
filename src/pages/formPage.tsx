import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import patterLine from "../assets/images/pattern-lines.svg";
import patternTop from "../assets/images/pattern-squiggly-line-top.svg";
import patternCircle from "../assets/images/pattern-circle.svg";
import patternBottom from "../assets/images/pattern-squiggly-line-bottom.svg";
import Logo from "../assets/images/logo-mark.svg";
import iconUpload from "../assets/images/icon-upload.svg"
import iconInfo from "../assets/images/icon-info.svg"
import { useNavigate } from "react-router-dom";
import '../App.css';
import { FileWithPreview, ValidationErrors, FormData } from "@/types";


function FormPage() {  
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [error, setError] = useState<ValidationErrors>({})
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    github: ""
  })
  const navigate = useNavigate();

  const validateField = (name: string, value: any): string => {
    if (!value) return `${name} is required`;
    
    switch (name) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Enter a valid email format';
      case 'github':
        return /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(value) ? '' : 'Enter a github username';
      default:
        return '';
    }
  };


  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (acceptedFiles.length > 0) {
      setFiles([Object.assign(acceptedFiles[0], { 
        preview: URL.createObjectURL(acceptedFiles[0])
      })]);
      setError(prev => ({ ...prev, avatar: '' }));
    }
    
    if (fileRejections.length > 0) {
      setError(prev => ({ ...prev, avatar: 'File too large or invalid type' }));
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

  const removeAvatar = () => {
    setFiles([]);
  };

  const changeAvatar =() => {
    open()
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setError(prev => ({ ...prev, [name]: error }));
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    const newErrors: ValidationErrors = {};
    let isValid = true;

    // Validate all fields
    Object.entries(formData).forEach(([field, value]) => {
      const error = validateField(field, value);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    if (!files.length) {
      newErrors.avatar = 'Avatar is required';
      isValid = false;
    }

    setError(newErrors);

    if (isValid) {
      navigate("/ticket", {
        state: { ...formData, avatar: files[0]?.preview },
      });
    }
  };

  return (
    <div className="relative w-full h-screen bg-[url('./assets/images/background-desktop.png')] bg-cover bg-center overflow-auto">
      <div className="">
        <img src={patternCircle} alt="" className="fixed md:w-32 w-20 md:ml-6 md:-top-12 -top-6 md:left-0 -left-3" />
        <img src={patterLine} className="fixed inset-0" />
        <img src={patternTop} className="fixed top-6 right-0 mt md:w-80 w-28 " />
        <img src={patternCircle} alt="" className="fixed md:right-32 -right-10 md:w-32 w-20 md:mt-64 mt-36 " />
        <img src={patternBottom} alt="" className="fixed bottom-0 w-96" />
      </div>
      <div className="relative">
        <div className="text-white flex gap-4 justify-center items-center font-inconsolata m-4">
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

        {/* Form with overflow handling */}
        <form onSubmit={handleSubmit} className="text-white  flex flex-col justify-center w-80 md:w-96 absolute left-1/2 transform -translate-x-1/2 p-3  ">
          <div className="w-full font-inconsolata">
            <p className="mb-2">Upload Avatar</p>
            <div {...getRootProps()} className="cursor-pointer bg-gray-700 bg-opacity-50 rounded-lg border-dashed border-2 p-2">
              <input {...getInputProps()} />
              {files.length > 0 ? (
                <div className="flex flex-col justify-center items-center ">
                  <img src={files[0].preview} alt="preview avatar" className="w-12 h-12 rounded-xl " />
                  <div className="flex gap-2 mt-4">
                    <button onClick={removeAvatar} className="bg-gray-500 rounded md:rounded-lg text-[16px] md:text-sm px-0.5">Remove image</button>
                    <button onClick={changeAvatar} className="bg-gray-500 rounded md:rounded-lg text-[16px] md:text-sm px-0.5">Change Image</button>
                  </div>
                </div>
              ) : isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <div className="flex flex-col items-center">
                  <img src={iconUpload} alt="" className="w-12"/>
                  <p>Drag and drop or click to upload</p>
                </div>
              )}
            </div>
            {error.avatar ? (
              <div className="flex gap-2 mb-4 text-red">
                <img src={iconInfo} alt="" className="text-red" />
                <p className="text-[14px] md:text-sm font-inconsolata"> Upload your photo (JPG or PNG, max size: 500KB)</p>
              </div>
            ): (
              <div className="flex gap-2 mb-4">
                <img src={iconInfo} alt="" />
                <p className="text-[14px] md:text-sm font-inconsolata"> Upload your photo (JPG or PNG, max size: 500KB)</p>
              </div>
            )}
            <div className="overflow-auto font-inconsolata">
              <div className="flex flex-col">
                <label htmlFor="" className="m-2">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="rounded-lg p-2 bg-[#8784a4] bg-opacity-20 border-[#8784a4]" />
                {error.name && (
                  <p className="text-red-500 text-sm mt-1">{error.name}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="m-2">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="rounded-lg p-2 bg-[#8784a4] bg-opacity-20 border-[#8784a4]"/>
                {error.email && (
                  <p className="text-red-500 text-sm mt-1">{error.email}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="m-2">Github Username</label>
                <input type="text" name="github" value={formData.github} onChange={handleChange}  className="rounded-lg p-2 bg-[#8784a4] bg-opacity-20 border-[#8784a4]" />
                {error.github && (
                  <p className="text-red-500 text-sm mt-1">{error.github}</p>
                )}
              </div>
              <button className="bg-[#f57261] w-full p-2 rounded-lg mt-3 mb-3 text-[#0c082b] font-extrabold">
                Generate My Ticket
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormPage;