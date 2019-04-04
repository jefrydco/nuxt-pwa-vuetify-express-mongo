<template>
  <v-layout row="" wrap="">
    <v-flex xs12="" md4="">
      <v-card>
        <v-toolbar card="" dark="" color="primary">
          <v-toolbar-title>{{ isEditingLabel }} Product</v-toolbar-title>
          <v-spacer />
          <v-btn
            :disabled="isLoading"
            :loading="isLoading"
            color="white"
            light=""
            @click="onClearInput"
          >
            Clear
          </v-btn>
          <v-btn
            :disabled="isLoading"
            :loading="isLoading"
            color="accent"
            type="submit"
            @click="onSubmit"
          >
            {{ isEditingLabel }}
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-text-field
            v-validate="'required|alpha_spaces|min:3'"
            :disabled="isLoading"
            :error-messages="errors.collect('name')"
            v-model="product.name"
            clearable=""
            name="name"
            label="Name"
            box=""
            required=""
            data-vv-as="Name"
            data-vv-name="name"
          />
          <v-text-field
            v-validate="'required|numeric|min_value:0'"
            :disabled="isLoading"
            :error-messages="errors.collect('quantity')"
            v-model="product.quantity"
            clearable=""
            name="quantity"
            label="Quantity"
            box=""
            required=""
            min="0"
            data-vv-as="Quantity"
            data-vv-name="quantity"
            type="number"
          />
          <v-text-field
            v-validate="'required|numeric|min_value:100'"
            :disabled="isLoading"
            :error-messages="errors.collect('price')"
            v-model="product.price"
            clearable=""
            name="price"
            label="Price"
            box=""
            required=""
            min="100"
            data-vv-as="Price"
            data-vv-name="price"
            type="number"
          />
          <v-dialog
            ref="datepicker"
            v-model="isDatepicker"
            :return-value.sync="product.expirationDate"
            persistent
            lazy
            full-width
            width="290px"
          >
            <v-text-field
              slot="activator"
              :disabled="isLoading"
              v-model="formatedExpirationDate"
              clearable=""
              name="expirationDate"
              label="Expiration Date"
              box=""
              required=""
              readonly=""
            />
            <v-date-picker v-model="product.expirationDate" scrollable>
              <v-spacer />
              <v-btn flat color="primary" @click="isDatepicker = false">
                Cancel
              </v-btn>
              <v-btn
                flat
                color="primary"
                @click="$refs.datepicker.save(product.expirationDate)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12="" md8="">
      <v-card>
        <v-toolbar card="" dark="" color="primary">
          <v-toolbar-title>Product List</v-toolbar-title>
          <v-spacer />
          <v-text-field
            v-model="keyword"
            label="Search..."
            name="search"
            clearable=""
            flat=""
            light=""
            solo=""
            hide-details=""
          />
        </v-toolbar>
        <v-card-text>
          <v-data-table
            :pagination.sync="pagination"
            :search="keyword"
            :headers="headers"
            :items="products"
            item-key="_id"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.quantity }}</td>
              <td>{{ props.item.price }}</td>
              <td>{{ formatDate(props.item.expirationDate) }}</td>
              <td>
                <v-tooltip bottom="">
                  <v-btn
                    slot="activator"
                    :disabled="isLoading"
                    :loading="isLoading"
                    :data-index="props.index"
                    class="v-btn__custom--edit"
                    icon=""
                    color="primary"
                    @click="onEdit(props.item)"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <span>Edit {{ props.item.name }}</span>
                </v-tooltip>
                <v-tooltip slot="activator" bottom="">
                  <v-btn
                    slot="activator"
                    :disabled="isLoading"
                    :loading="isLoading"
                    :data-index="props.index"
                    class="v-btn__custom--delete"
                    icon=""
                    color="error"
                    @click="onDeleteTrigger(props.item)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                  <span>Delete {{ props.item.name }}</span>
                </v-tooltip>
              </td>
            </template>
          </v-data-table>
          <app-delete-dialog
            v-model="isDeleting"
            :name="currentProduct.name"
            @delete="onDelete"
            @cancel="onClearInput"
          />
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import notif from "~/mixins/notif";

export default {
  mixins: [notif],
  asyncData({ app }) {
    return app.$api.products.index().then(({ error, message, data }) => {
      if (!error) {
        return { products: data };
      }
      return { products: [] };
    });
  },
  data() {
    return {
      isLoading: false,
      isEditing: false,
      isDeleting: false,
      isDatepicker: false,
      products: [],
      keyword: null,
      currentProduct: {
        name: null,
        quantity: null,
        price: null,
        expirationDate: null
      },
      product: {
        name: null,
        quantity: null,
        price: null,
        expirationDate: null
      },
      defaultProduct: {
        name: null,
        quantity: null,
        price: null,
        expirationDate: null
      },
      headers: [
        { text: "Name", value: "name" },
        { text: "Quantity", value: "quantity" },
        { text: "Price", value: "price" },
        { text: "Expiration Date (MM/DD/YYYY)", value: "expirationDate" },
        { text: "Action", sortable: false, value: "action" }
      ],
      pagination: {
        sortBy: null
      },
      formatedExpirationDate: null
    };
  },
  computed: {
    isEditingLabel() {
      if (this.isEditing) {
        return "Edit";
      }
      return "Add";
    }
  },
  watch: {
    "product.expirationDate": function(date) {
      this.formatedExpirationDate = this.product.expirationDate
        ? this.formatDate(this.product.expirationDate)
        : null;
    }
  },
  methods: {
    formatDate(date) {
      return this.$moment(date).format("L");
    },
    getProduct() {
      return this.$api.products.index().then(({ error, message, data }) => {
        if (!error) {
          this.products = data;
          return data;
        }
        return null;
      });
    },
    onClearInput() {
      this.isLoading = false;
      this.isEditing = false;
      this.isDeleting = false;
      this.currentProduct = { ...this.defaultProduct };
      this.product = { ...this.defaultProduct };
      this.$validator.reset();
    },
    onSubmit() {
      return this.$validator.validate().then(isValid => {
        if (isValid) {
          this.isLoading = true;

          if (this.isEditing) {
            const data = {
              name: this.product.name,
              quantity: this.product.quantity,
              price: this.product.price,
              expirationDate: this.product.expirationDate
            };
            return this.$api.products
              .update(this.product._id, data)
              .then(({ error, message, data }) => {
                if (!error) {
                  this.getProduct();
                  this.onClearInput();
                  this.setNotif("Product is edited successfully.", "info");
                  return data;
                }
                return false;
              })
              .finally(() => {
                this.isLoading = false;
              })
              .catch(error => {
                this.setNotif("Product is failed to edit.", "error");
                this.$log.error(error);
              });
          }
          return this.$api.products
            .store(this.product)
            .then(({ error, message, data }) => {
              if (!error) {
                this.getProduct();
                this.onClearInput();
                this.setNotif("Product is added successfully.", "info");
                return data;
              }
              return false;
            })
            .finally(() => {
              this.isLoading = false;
            })
            .catch(error => {
              this.setNotif("Product is failed to add.", "error");
              this.$log.error(error);
            });
        }
        return false;
      });
    },
    onEdit(product) {
      this.isEditing = true;
      this.product = {
        ...product,
        expirationDate: this.formatDate(product.expirationDate)
      };
    },
    onDeleteTrigger(product) {
      this.isDeleting = true;
      this.currentProduct = product;
    },
    onDelete() {
      this.isLoading = true;
      return this.$api.products
        .delete(this.currentProduct._id)
        .then(({ error, message, data }) => {
          if (!error) {
            this.getProduct();
            this.onClearInput();
            this.setNotif("Product is deleted successfully.", "info");
            return data;
          }
          return false;
        })
        .finally(() => {
          this.isLoading = false;
        })
        .catch(error => {
          this.setNotif("Product is failed to delete.", "error");
          this.$log.error(error);
        });
    }
  }
};
</script>
