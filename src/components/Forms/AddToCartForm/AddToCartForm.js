import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ReactComponent as AddToCartIcon } from '../../../assets/icons/cartIcons//add.svg';
import { fetchProductToCart } from '../../../axios/cart/requests';
import Section from '../../../hoc/Section/Section';
import { showAlert } from '../../../store/actions/alert';
import { addToCart } from '../../../store/actions/cart';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import classes from './AddToCartForm.module.css';
import { initialFormControls, validateControl } from './formHelpers';

// form to add products to the cart

const AddToCartForm = () => {
  const dispatch = useDispatch();

  // defining local state for form's values

  const [controls, setControls] = useState({
    isFormValid: false,
    formControls: initialFormControls,
  });

  const submitHandler = (event) => {
    event.preventDefault();
  };

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
        >
          <span>add to cart</span>
          <AddToCartIcon width='20' height='20' />
        </Button>
      </form>
    </Section>
  );
};

export default AddToCartForm;
