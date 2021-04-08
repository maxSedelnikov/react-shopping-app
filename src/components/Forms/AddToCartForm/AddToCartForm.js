import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { ReactComponent as AddToCartIcon } from 'assets/icons/cartIcons/add.svg';
import { fetchProductToCart } from 'axios/cart/requests';
import Button from 'components/UI/Button';
import Input from 'components/UI/Input';
import Section from 'hoc/Section';
import { showAlert } from 'store/actions/alert';
import { addToCart } from 'store/actions/cart';

import classes from './AddToCartForm.module.css';
import { initialFormControls, validateControl } from './formHelpers';

/**
 * A form for adding new products to the cart
 * @category Application
 * @subcategory Elements
 * @component AddToCartForm
 * @returns {jsx} add to cart form
 * @see Input
 * @see Section
 * @see Button
 */

const AddToCartForm = () => {
  const dispatch = useDispatch();

  // defining local state for form's values
  const [controls, setControls] = useState({
    isFormValid: false,
    formControls: initialFormControls,
  });

  /**
   * Submit handler
   * @memberof AddToCartForm
   * @inner
   * @function submitHandler
   * @param {object} event
   */

  const submitHandler = (event) => {
    event.preventDefault();
  };

  /**
   * Inout change handler + validation
   * @memberof submitHandler
   * @inner
   * @function onChangeHandler
   * @param {object} event
   * @param {string} controlName
   */

  const onChangeHandler = (event, controlName) => {
    // getting targeted form controls from the state
    const formControls = { ...controls.formControls };
    const control = { ...formControls[controlName] };

    // gathering and validating targeted input value
    control.value = event.target.value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);
    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    // updating form's local state
    setControls({ formControls, isFormValid });
  };

  /**
   * Create product handler
   * @memberof AddToCartForm
   * @inner
   * @function createProductHandler
   * @see module:Requests~fetchProductToCart
   * @see module:CartActions~addToCart
   * @see module:AlertActions~showAlert
   */

  const createProductHandler = async () => {
    // creating a product by getting form's values from the local state
    const product = {
      name: controls.formControls.productName.value,
      pictureUrl: controls.formControls.productUrl.value,
      price: +controls.formControls.productPrice.value,
      quantity: 1,
    };

    try {
      const response = await fetchProductToCart(product);

      product.id = response.data.name;

      dispatch(addToCart(product));
      dispatch(
        showAlert({
          alertType: 'success',
          alertMessage: 'Product added to your order',
        })
      );
    } catch (error) {
      dispatch(
        showAlert({
          alertType: 'error',
          alertMessage: `Could not fetch product to cart: ${error.message}`,
        })
      );
    }

    setControls({
      isFormValid: false,
      formControls: initialFormControls,
    });
  };

  /**
   * Rendering all needed inputs
   * @memberof AddToCartForm
   * @inner
   * @function renderInputs
   * @returns {jsx} inputs
   */

  const renderInputs = () => {
    return Object.keys(controls.formControls).map((controlName, index) => {
      const control = controls.formControls[controlName];
      return (
        <Input
          key={control + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation}
          onChange={(event) => onChangeHandler(event, controlName)}
        />
      );
    });
  };

  return (
    <Section>
      <form
        className={classes.AddToCartForm}
        onSubmit={(event) => submitHandler(event)}
      >
        <h3>Create Product</h3>
        {renderInputs()}
        <Button
          disabled={!controls.isFormValid}
          onClick={() => createProductHandler()}
          dataTestId='create-product-btn'
        >
          <span>add to cart</span>
          <AddToCartIcon width='20' height='20' />
        </Button>
      </form>
    </Section>
  );
};

export default AddToCartForm;
