import React, { FormEvent, useState, FC } from "react";
import "./Register.scss";

interface IregisterProps {
  close: () => void;
}

const Register: FC<IregisterProps> = ({ close }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days: number[] = [];
  for (let i = 1; i <= 31; i++) {
    days.push(i);
  }

  const years: number[] = [];
  for (let i = 2022; i >= 1900; i--) {
    years.push(i);
  }

  const initialFormState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
  };

  const [formState, setFormState] = useState(initialFormState);
  const { firstName, lastName, email, password, gender } = formState;

  const handleChange = ({
    currentTarget: { id, value },
  }: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [id]: value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.table(formState);
    close();
  };

  return (
    <div className="register">
      <div className="card">
        <h1>Sign Up</h1>
        <p>It's quick and easy.</p>
        <hr />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            id="firstName"
            onChange={handleChange}
            value={firstName}
            placeholder="first name"
            required
          />
          <input
            type="text"
            name="lastName"
            id="lastName"
            onChange={handleChange}
            value={lastName}
            placeholder="last name"
            required
          />
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            value={email}
            placeholder="email"
            required
          />
          <input
            type="password"
            name="pasword"
            id="password"
            onChange={handleChange}
            value={password}
            placeholder="new password"
            autoComplete="new password"
            required
          />
          <div className="birthday">
            <label htmlFor="birthday">Birthday</label>
            <select name="month" id="month">
              {months &&
                months.map((month) => {
                  return (
                    <option key={`month${month}`} value={month}>
                      {month}
                    </option>
                  );
                })}
            </select>
            <select name="day" id="day">
              {days &&
                days.map((day) => {
                  return (
                    <option key={`day${day}`} value={day}>
                      {day}
                    </option>
                  );
                })}
            </select>
            <select name="year" id="year">
              {years &&
                years.map((year) => {
                  return (
                    <option key={`year${year}`} value={year}>
                      {year}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="gender">
            <div className="labelinput">
              <label htmlFor="female">Female</label>
              <input
                type="radio"
                name="gender"
                id="gender"
                value="female"
                onChange={handleChange}
              />
            </div>
            <div className="labelinput">
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                name="gender"
                id="gender"
                value="male"
                onChange={handleChange}
              />
            </div>
            <div className="labelinput">
              <label htmlFor="custom">Custom</label>
              <input
                type="radio"
                name="gender"
                id="gender"
                value="custom"
                onChange={handleChange}
              />
            </div>
          </div>
          <input type="submit" value="Sign Up" />
        </form>
        <p>
          By clicking Sign Up, you agree to our Terms, Data Policy and Cookies
          Policy. You may receive SMS Notifications from us and can opt out any
          time.
        </p>
      </div>
    </div>
  );
};

export default Register;
