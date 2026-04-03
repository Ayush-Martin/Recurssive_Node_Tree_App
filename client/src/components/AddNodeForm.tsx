import { FC, FormEvent, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { z } from "zod";

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
  const inputClass = `add-node-input ${error ? "add-node-input--error" : ""}`;

  return (
    <form onSubmit={handleSubmit} className="add-node-form">
      <div className="add-node-input-container">
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError(null);
          }}
          placeholder={placeholder}
          className={inputClass}
          disabled={isSubmitting}
        />
        {error && <div className="add-node-error-message">{error}</div>}
      </div>

      <button
        type="submit"
        className="add-node-btn"
        disabled={isInvalid || isSubmitting}
      >
        {isSubmitting ? (
          <span className="spinner" />
        ) : (
          <>
            <HiPlus />
            <span>{buttonLabel}</span>
          </>
        )}
      </button>
    </form>
  );
};

export default AddNodeForm;
