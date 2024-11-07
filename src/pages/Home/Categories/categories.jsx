import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  IconButton,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { MdOutlineDeleteOutline, MdEdit } from "react-icons/md";
import Button from "../../../components/Button/Button";
import CategoryModal from "./components/modal-create-caregory";
import { useCrudCategory } from "../../../hooks/category.hook";

export default function Categories() {
  const [categories, setCategories] = useState({
    headers: [{ label: "Tag", column: "tag" }],
    rows: [],
  });
  const [newTag, setNewTag] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categorySelected, setCategorySelected] = useState(false);

  const handleCloseModal = () => setIsModalOpen((prev) => !prev);
  const handleOpenModal = () => setIsModalOpen((prev) => !prev);

  const { getCategories, deleteCategory } = useCrudCategory();

  const handleGetCategories = async () => {
    const result = await getCategories.mutateAsync();
    const categoriesData = result.data.map((item) => ({
      id: item.id,
      label: item.name,
      value: item.name,
    }));
    setCategories((prev) => ({
      ...prev,
      rows: categoriesData,
    }));
  };

  useEffect(() => {
    handleGetCategories();
  }, []);

  const handleDeleteCategory = async (id) => {
    await deleteCategory.mutate(id);
    setCategories((prevState) => ({
      ...prevState,
      rows: prevState.rows.filter((category) => category.id !== id),
    }));
  };

  const handleTagSubmit = (event) => {
    event.preventDefault();
    if (!newTag) {
      return;
    }

    //   ...prev,
    //   rows: [...prev.rows, { id: prev.rows.length + 1, tag: newTag }],
    // }));
    setNewTag("");
  };

  const handleChange = (event) => {
    setNewTag(event.target.value);
  };

  const { headers, rows } = categories;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "40px",
          width: "100%",
          height: "100vh",
          bgcolor: "#f5f5f5",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Category
        </Typography>
        <Box
          component="form"
          onSubmit={handleTagSubmit}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            width: "100%",
            maxWidth: "600px",
            mb: 2,
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Insert tag name"
            value={newTag}
            onChange={handleChange}
            fullWidth
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<FaPlus />}
            onClick={() => handleOpenModal()}
          >
            Add Category
          </Button>
        </Box>
        <TableContainer
          component={Paper}
          sx={{ width: "100%", maxWidth: "600px" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((header, index) => (
                  <TableCell key={index}>{header.label}</TableCell>
                ))}
                {rows.length !== 0 && <TableCell></TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={headers.length + 1} align="center">
                    No tags available
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row) => (
                  <TableRow key={row.id}>
                    {headers.map((header, colIndex) => (
                      <TableCell key={colIndex}>{row.label}</TableCell>
                    ))}
                    <TableCell align="right">
                      <IconButton
                        onClick={() => handleDeleteCategory(row.id)}
                        color="secondary"
                      >
                        <MdOutlineDeleteOutline />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setCategorySelected(row);
                          handleOpenModal();
                        }}
                      >
                        <MdEdit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <CategoryModal
        handleCloseModal={handleCloseModal}
        isModalOpen={isModalOpen}
        category={categorySelected}
        setCategories={setCategories}
      />
    </>
  );
}

Categories.propTypes = {
  tags: PropTypes.shape({
    headers: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        column: PropTypes.string.isRequired,
      })
    ).isRequired,
    rows: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        tag: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  setTags: PropTypes.func.isRequired,
};
