import Product from "../models/Product";

const response = {
  error: false,
  message: "",
  data: []
};

const index = (req, res) => {
  return Product.find()
    .lean()
    .then(collection =>
      res.json({
        ...response,
        data: collection
      })
    );
};

const store = (req, res) => {
  return Product.create(req.body).then(() =>
    res.json({
      ...response,
      message: "saved"
    })
  );
};

const show = (req, res) => {
  return Product.findById(req.params.id)
    .lean()
    .then(collection =>
      res.json({
        ...response,
        data: collection
      })
    );
};

const update = (req, res) => {
  return Product.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
    collection =>
      res.json({
        ...response,
        message: "updated",
        data: collection
      })
  );
};

const remove = (req, res) => {
  return Product.findOneAndDelete({ _id: req.params.id })
    .lean()
    .then(collection =>
      res.json({
        ...response,
        message: "deleted",
        data: collection
      })
    );
};

export default {
  index,
  store,
  show,
  update,
  remove
};
