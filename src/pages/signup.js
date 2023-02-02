import { Button, Form, Input } from 'antd';
import {redirect, useNavigate} from "react-router-dom";

//todo: extract api fetching
export default function Signup() {
    const nav = useNavigate();
    const onFinish = (values) => {
        if (values.password === values.password_confirm) {
            delete values.password_confirm;
            fetch('http://localhost:8000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            }).then(data => data.json()).then(res => {
                fetch('http://localhost:8000/api/auth/login', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: values.email,
                        password: values.password
                    })
                }).then(data => {
                    if (data.ok){
                        redirect('/')
                    }
                    throw new Error('Something went wrong creating the user')
                })
                nav('/')
            });
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>


            <Form.Item
                label="Confirm your password"
                name="password_confirm"
                rules={[{ required: true, message: 'Please input your password confirmation!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item className={"last-input"} wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}
