import { FormEvent, useState } from "react";
import { HiPlus } from "react-icons/hi";

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit(trimmed);
      setName("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-node-form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={placeholder}
        className="add-node-input"
        disabled={isSubmitting}
      />
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
