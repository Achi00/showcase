"use client";
import { ProjectInterface, SessionInterface } from "@/common.types";
import Image from "next/image";
import { ChangeEvent, useState, useEffect } from "react";
import FormField from "./FormField";
import { FcImageFile } from "react-icons/fc";
import { categoryFilters } from "@/constants";
import CustomMenu from "./CustomMenu";
import toast from "react-hot-toast";
import Button from "./Button";
import { createNewProject, fetchToken, updateProject } from "@/lib/actions";
import { useRouter } from "next/navigation";

type Props = {
  type: string;
  session: SessionInterface;
  project?: ProjectInterface;
};

const ProjectForm = ({ type, session, project }: Props) => {
  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setisSubmitting(true);

    if (!form.category) {
      toast.error("Please select a category for your project.");
      setisSubmitting(false);
      return;
    }
    if (!form.title) {
      toast.error("Please select a name for your project.");
      setisSubmitting(false);
      return;
    }
    if (!form.description) {
      toast.error("Please select a name for your project.");
      setisSubmitting(false);
      return;
    }

    const { token } = await fetchToken();
    try {
      if (type === "create") {
        const newForm = {
          ...form,
          liveSiteUrl: form.liveSiteUrl || "",
          githubUrl: form.githubUrl || "",
          linkedinUrl: form.linkedinUrl || "",
          behanceUrl: form.behanceUrl || "",
          youtubeUrl: form.youtubeUrl || "",
        };

        await createNewProject(newForm, session?.user?.id, token);
        toast.success("Project created successfully");
        router.push("/");
      }
      if (type === "edit") {
        await updateProject(form, project?.id as string, token);
        toast.success("Project edited successfully");
        router.push("/");
      }
    } catch (error) {
      toast.success("Something went wrong");
      console.log(error);
    } finally {
      setisSubmitting(false);
    }
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;

    // Add video types to your condition check
    if (!file.type.includes("image") && !file.type.includes("video")) {
      return toast.error("Please upload an image or video file");
    }

    // Check if the file size exceeds 25MB
    const fileSize = file.size / 1024 / 1024; // in MB
    if (fileSize > 25) {
      return toast.error("The file size should not exceed 25MB");
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      handleStateChange("image", result); // You might want to change this state variable name as it's not only image now
    };
  };

  const handleStateChange = (fieldName: string, value: string) => {
    setform((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const [isSubmitting, setisSubmitting] = useState(false);
  const [form, setform] = useState({
    title: project?.title || "",
    description: project?.description || "",
    image: project?.image || "",
    liveSiteUrl: project?.liveSiteUrl || "",
    githubUrl: project?.githubUrl || "",
    linkedinUrl: project?.linkedinUrl || "",
    behanceUrl: project?.behanceUrl || "",
    category: project?.category || "",
    youtubeUrl: project?.youtubeUrl || "",
  });

  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && (
            <div className="flex flex-col justify-center items-center gap-4 border-blue-500 border rounded-lg p-4">
              <h2>Choose a poster for your project</h2>
              <FcImageFile size={70} />
            </div>
          )}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === "create"}
          className="form_image-input"
          onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            src={form?.image}
            className="sm:p-10 object-contain z-20"
            alt="Project Poster"
            fill
          />
        )}
      </div>
      <CustomMenu
        title="Category*"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      />
      <FormField
        title="Title*"
        state={form.title}
        placeholder="Project title"
        setState={(value) => handleStateChange("title", value)}
      />
      <FormField
        title="Description*"
        state={form.description}
        placeholder="Project description"
        setState={(value) => handleStateChange("description", value)}
      />
      <FormField
        type="url"
        title="Website URL (Optional)"
        state={form.liveSiteUrl}
        placeholder="https://myWebSite.com"
        setState={(value) => handleStateChange("liveSiteUrl", value)}
        isRequired={false}
      />

      {/* LinkedIn URL always visible */}
      <FormField
        type="url"
        title="LinkedIn URL (Optional)"
        state={form.linkedinUrl}
        placeholder="https://github.com/username"
        setState={(value) => handleStateChange("linkedinUrl", value)}
        isRequired={false}
      />

      {/* Github URL for Web */}
      {form.category === "Web" && (
        <FormField
          type="url"
          title="Github URL (Optional)"
          state={form.githubUrl}
          placeholder="https://github.com/username"
          setState={(value) => handleStateChange("githubUrl", value)}
          isRequired={false}
        />
      )}

      {/* Behance URL for Web, Mobile, UI/UX, 3D Design */}
      {["Web", "Mobile", "UI/UX", "3D Design"].includes(form.category) && (
        <FormField
          type="url"
          title="Behance URL (Optional)"
          state={form.behanceUrl}
          placeholder="https://github.com/username"
          setState={(value) => handleStateChange("behanceUrl", value)}
          isRequired={false}
        />
      )}

      {/* Youtube URL for Web, Mobile, UI/UX, 3D Design, Video Editing */}
      {["Web", "Mobile", "UI/UX", "3D Design", "Video Editing"].includes(
        form.category
      ) && (
        <FormField
          type="url"
          title="Youtube URL (Optional)"
          state={form.youtubeUrl}
          placeholder="https://github.com/username"
          setState={(value) => handleStateChange("youtubeUrl", value)}
          isRequired={false}
        />
      )}

      {/* category input */}

      <div className="flexStart w-full">
        <Button
          title={
            isSubmitting
              ? `${type === "create" ? "Creating" : "Editing"}`
              : `${type === "create" ? "Create" : "Edit"}`
          }
          type="submit"
          leftIcon={isSubmitting ? "" : "/plus.svg"}
          isSubmitting={isSubmitting}
          rightIcon={null}
        />
      </div>
    </form>
  );
};

export default ProjectForm;
