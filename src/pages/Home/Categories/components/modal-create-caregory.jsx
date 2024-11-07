/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "../../../../components/Modal/Modal";
import InputText from "../../../../components/InputText/InputText";
import { useCrudCategory } from "../../../../hooks/category.hook";

const CategoryModal = ({
  isModalOpen,
  handleCloseModal,
  category,
  setCategories,
}) => {
  const [newCategory, setNewCategory] = useState({
    name: "",
  });

  const { createNewCategory, updateCategory } = useCrudCategory();

  const handleSubmit = async () => {
    try {
      if (category?.id) {
        await updateCategory.mutateAsync({
          id: category.id,
          name: newCategory.name,
        });

        setCategories((prevState) => ({
          ...prevState,
          rows: prevState.rows.map((row) =>
            row.id === category.id ? { ...row, label: newCategory.name } : row
          ),
        }));
      } else {
        // Cria uma nova categoria
        await createNewCategory.mutateAsync({
          name: newCategory.name,
        });

        // Adiciona a nova categoria ao estado
        setCategories((prevState) => ({
          ...prevState,
          rows: [
            ...prevState.rows,
            { id: Date.now(), label: newCategory.name },
          ],
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      title={category.id ? `Update Category` : `Add new Category`}
      handleSubmit={handleSubmit}
      setNewTask={setNewCategory}
    >
      <form onSubmit={handleSubmit}>
        <InputText
          label="Name"
          placeholder="Insert name"
          defaultValue={category.label}
          required={true}
          onChange={(e) =>
            setNewCategory((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </form>
    </Modal>
  );
};

export default CategoryModal;
