import { useState, useEffect } from "react";
import {
  ArrowBackIosNew,
  ArrowForwardIos,
  Edit,
  Delete,
  Info,
} from "@mui/icons-material";
import {
  Card,
  Chip,
  Stack,
  Button,
  Rating,
  Dialog,
  CardMedia,
  Typography,
  IconButton,
  CardContent,
  CardActions,
  DialogTitle,
  DialogContent,
  DialogActions,
  Skeleton,
} from "@mui/material";
import { product } from "../controller";
import { useAppDispatch } from "@/lib/hooks";
import ProductDetails from "./ProductDetails";
import { updateProduct, deleteProduct } from "@/lib/features/productsSlice";
import ProductEditForm, { ProductFormInputs } from "./ProductEditForm";

interface ProductCardProps {
  product: product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const [imageIndex, setImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<boolean[]>(
    product.images?.map(() => false) || []
  );
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false);

  useEffect(() => {
    if (product.images) {
      const img = new Image();
      img.src = product.images[imageIndex];

    }
  }, [imageIndex, product.images]);

  const handlePrevImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setImageIndex((prevIndex) =>
      prevIndex === 0 ? (product.images?.length || 0) - 1 : prevIndex - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setImageIndex((prevIndex) =>
      prevIndex === (product.images?.length || 0) - 1 ? 0 : prevIndex + 1
    );
  };

  const handleOpenImageModal = () => {
    setOpenImageModal(true);
  };

  const handleCloseImageModal = () => {
    setOpenImageModal(false);
  };

  const handleOpenDetailsModal = () => {
    setOpenDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setOpenDetailsModal(false);
  };

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleEditSubmit = (data: ProductFormInputs) => {
    dispatch(updateProduct({ id: product.id, ...data }));
  };

  const handleOpenDeleteConfirmModal = () => {
    setOpenDeleteConfirmModal(true);
  };

  const handleCloseDeleteConfirmModal = () => {
    setOpenDeleteConfirmModal(false);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteProduct(product.id));
    setOpenDeleteConfirmModal(false);
  };

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  return (
    <Card sx={{ position: "relative" }}>
      {product.discountPercentage > 0 && (
        <Chip
          label={`-${product.discountPercentage}%`}
          color="secondary"
          size="small"
          sx={{ position: "absolute", top: 10, left: 10, zIndex: 1 }}
        />
      )}
      <div
        style={{ position: "relative", cursor: "pointer" }}
        onClick={handleOpenImageModal}
      >
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handlePrevImage(e);
          }}
          sx={{
            position: "absolute",
            top: "50%",
            left: 8,
            transform: "translateY(-50%)",
            color: "white",
            backgroundColor: "rgba(0,0,0,0.5)",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
            zIndex: 1,
          }}
          disabled={imageIndex === 0}
        >
          <ArrowBackIosNew fontSize="small" />
        </IconButton>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleNextImage(e);
          }}
          sx={{
            position: "absolute",
            top: "50%",
            right: 8,
            transform: "translateY(-50%)",
            color: "white",
            backgroundColor: "rgba(0,0,0,0.5)",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
            zIndex: 1,
          }}
          disabled={imageIndex === (product.images?.length || 0) - 1}
        >
          <ArrowForwardIos fontSize="small" />
        </IconButton>
        {!loadedImages[imageIndex] && (
          <Skeleton
            variant="rectangular"
            width="100%"
            height={200}
            sx={{ objectFit: "contain", padding: 1 }}
          />
        )}
        <CardMedia
          component="img"
          height="200"
          alt={product.title}
          sx={{
            objectFit: "contain",
            padding: 1,
            display: loadedImages[imageIndex] ? "block" : "none",
          }}
          image={product.images && product.images[imageIndex]}
          onLoad={() => handleImageLoad(imageIndex)}
          loading="lazy"
        />
      </div>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.description.substring(0, 100)}...
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="h6" color="text.primary">
            R${" "}
            {(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
          </Typography>
          {product.discountPercentage > 0 && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: "line-through" }}
            >
              R$ {product.price.toFixed(2)}
            </Typography>
          )}
        </Stack>
        <Rating
          value={product.rating}
          readOnly
          size="small"
          sx={{ mt: 1 }}
        />
        <Stack direction="row" spacing={1} mt={1}>
          {product.tags?.map((tag, index) => (
            <Chip key={index} label={tag} size="small" variant="outlined" />
          ))}
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between", flexWrap: "wrap", gap: 1 }}>
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            startIcon={<Edit />}
            onClick={handleOpenEditModal}
          >
            Editar
          </Button>
          <Button
            size="small"
            color="error"
            variant="outlined"
            startIcon={<Delete />}
            onClick={handleOpenDeleteConfirmModal}
          >
            Excluir
          </Button>
        </Stack>
        <Button
          size="small"
          color="info"
          variant="contained"
          startIcon={<Info />}
          onClick={handleOpenDetailsModal}
        >
          Detalhes
        </Button>
      </CardActions>
      <Chip
        label={product.availabilityStatus}
        color={
          product.availabilityStatus === "In Stock" ? "success" : "error"
        }
        size="small"
        sx={{ position: "absolute", top: 10, right: 10 }}
      />
      <Dialog
        open={openImageModal}
        onClose={handleCloseImageModal}
        maxWidth="md"
      >
        <DialogContent sx={{ padding: 0 }}>
          <img
            alt={product.title}
            style={{ width: "100%", height: "auto" }}
            src={product.images && product.images[imageIndex]}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDetailsModal}
        onClose={handleCloseDetailsModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{product.title}</DialogTitle>
        <DialogContent>
          <ProductDetails product={product} />
        </DialogContent>
      </Dialog>
      <ProductEditForm
        product={product}
        open={openEditModal}
        onSubmit={handleEditSubmit}
        onClose={handleCloseEditModal}
      />
      <Dialog
        open={openDeleteConfirmModal}
        onClose={handleCloseDeleteConfirmModal}
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>Tem certeza de que deseja excluir este produto?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirmModal} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ProductCard;
