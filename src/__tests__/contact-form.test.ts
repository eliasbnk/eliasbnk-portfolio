import { cleanup } from '@testing-library/react';

import { screen } from '@testing-library/dom';
import { ContactForm } from '../components/contact-form/contact-form';

describe('Contact Form', () => {
    it('knows that 2 and 2 make 4', () => {
        render(<ContactForm/>);
    const nameInputField = screen.getByTestId('name-input-field');
    const emailInputField = screen.getByTestId('email-input-field');
    const phoneNumberInputField = screen.getByTestId(
      'phone-number-input-field'
    );
    const messageInputField = screen.getByTestId('message-input-field');
    const formButton = screen.getByTestId('contact-form-send-button');

    expect(nameInputField).toHaveAttribute('label', 'Name');
    expect(nameInputField).toHaveAttribute('emailjsIdentifier', 'name');
  });
});
