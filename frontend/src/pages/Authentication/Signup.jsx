import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    pic: "",
  });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const postDetails = (pics) => {
    setLoading(true);

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
          setFormData((prevFormData) => {
            return {
              ...prevFormData,
              pic: data.url.toString(),
            };
          });
          console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please select an image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target || {};
    console.log({ name, value, files });
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: files?.length ? files[0] : value,
      };
    });
  };
  const handleShow = () => setShow(!show);
  const submitHandler = () => {
    setLoading(true);
    // const { name, email, password, confirmPassword, pic } = formData;
    const formArray = Object.entries(formData);
    console.log({ formArray });
    // formArray.map(([key, val]) => console.log({ key, val }));
    const isFormEmpty = formArray.some(([_, fieldValue]) => fieldValue === "");

    if (isFormEmpty) {
      toast({
        title: "Please enter all the fields!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const { name, email, password, pic } = formData;
      const { data } = axios.post("/api/user", { name, email, password, pic });
    } catch (error) {}
  };
  return (
    <VStack spacing="5px" color="black">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Enter Your Password"
            name="password"
            value={formData.password}
            type={show ? "text" : "password"}
            onChange={handleChange}
          />
          <InputRightElement>
            <Button onClick={handleShow}>{show ? "Hide" : "Show"}</Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirmPassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Confirm Your Password"
            type={show ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <InputRightElement>
            <Button onClick={handleShow}>{show ? "Hide" : "Show"}</Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload Your Picture</FormLabel>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
          name="pic"
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        isLoading={loading}
        onClick={submitHandler}
      >
        Signup
      </Button>
    </VStack>
  );
};

export default Signup;
