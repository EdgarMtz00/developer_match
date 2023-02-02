import {Button, Form, Input} from 'antd';
import {useNavigate} from "react-router-dom";

//todo: Store logged status
export default function Login() {
    const nav = useNavigate();

    const onFinish = (values) => {
        fetch('http://localhost:8000/api/auth/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        }).then(data => {
            if (data.ok){
                return data.json();
            }
            throw new Error('Login Failed');
        }).then(res => {
            console.log(res);
            nav('/');
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (<Form
            name="login"
            layout={'vertical'}
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[{required: true, message: 'Please input your email!'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                className={"last-input"}
                rules={[{required: true, message: 'Please input your password!'}]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item className={"last-input"} wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>);
}
