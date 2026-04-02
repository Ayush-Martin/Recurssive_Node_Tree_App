import { FormEvent, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { z } from "zod";

const addNodeSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters"),
});

interface AddNodeFormProps {
  onSubmit: (name: string) => Promise<void>;
  placeholder?: string;
  buttonLabel?: string;
}

const AddNodeForm = ({
  onSubmit,
  placeholder = "Node name",
  buttonLabel = "Add",
}: AddNodeFormProps) => {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationResult = addNodeSchema.safeParse({ name });

    if (!validationResult.success) {
      setError(validationResult.error.errors[0].message);
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      await onSubmit(validationResult.data.name);
      setName("");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          className={`add-node-input ${error ? "add-node-input--error" : ""}`}
          disabled={isSubmitting}
        />
        {error && <div className="add-node-error-message">{error}</div>}
      </div>
      <button
        type="submit"
        className="add-node-btn"
        disabled={!name.trim() || isSubmitting}
      >
        {isSubmitting ? (
          <span className="spinner" />
        ) : (
          <>
            <HiPlus />
            {buttonLabel}
          </>
        )}
      </button>
    </form>
  );
};

export default AddNodeForm;
