import { render, screen} from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import LoginForm from '.';
import userEvent from '@testing-library/user-event';

// Add more unit test here

describe('testing Sign In Form', () => {
  test('renders sign in page', () => {
    render(<LoginForm />);
    const signInText = screen.getByText("Sign in");
    expect(signInText).toBeInTheDocument();
  });

  test('email field testing',  () => {
    render(<LoginForm/>);
    const input = screen.getByRole('email', { name: /email/i });
    expect(input).toBeInTheDocument(); // render component success 
    expect(input.value).toBe(""); // default input value is empty string 
    userEvent.type(input, "example@gmail.com"); // enter valid email 
    expect(screen.getByRole('email', { name: /email/i }).value).toBe("example@gmail.com") //match entered value 
  })
  

})