import { FC, FormEvent, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { z } from "zod";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

const addNodeSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
});

interface AddNodeFormProps {
  onSubmit: (name: string) => Promise<void>;
  placeholder?: string;
  buttonLabel?: string;
}

const AddNodeForm: FC<AddNodeFormProps> = ({
  onSubmit,
  placeholder = "Node name",
  buttonLabel = "Add",
}) => {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validation = addNodeSchema.safeParse({ name });
    if (!validation.success) {
      setError(validation.error.issues[0].message);
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      await onSubmit(validation.data.name);
      setName("");
    } catch (err) {
      console.error("AddNodeForm submission failed:", err);
      setError("Failed to create node. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isInvalid = !name.trim();

  return (
    <form onSubmit={handleSubmit} className="add-node-form">
      <Input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          if (error) setError(null);
        }}
        placeholder={placeholder}
        disabled={isSubmitting}
        error={error}
      />

      <Button
        type="submit"
        variant="outline"
        disabled={isInvalid}
        isLoading={isSubmitting}
      >
        <HiPlus />
        <span>{buttonLabel}</span>
      </Button>
    </form>
  );
};

export default AddNodeForm;
