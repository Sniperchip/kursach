import {
  Card,
  Col,
  Descriptions,
  Row,
  Form,
  Input,
  Checkbox,
  Button,
  message,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import { FeedbackFormValues } from './interface';

export default function Contacts() {
  const handleSubmit = () => form.submit();
  const onFinish = (values: FeedbackFormValues) => {
    console.log(values);
    message.success(
      'Сообщение успешно отправлено. Мы скоро свяжемся с вами!',
      3
    );
  };

  const [form] = useForm();

  return (
  
    <div className='site-card-wrapper'>
      <Row gutter={24}>
        <Col span={12}>
          <Card
            hoverable
            bordered={false}
            title='г. Новосибирск, ул. Выставочная 15/1, корп.3'
          >
            <Descriptions layout='vertical' size='small' bordered>
              <Descriptions.Item label='Телефон'>
                <Col>
                  <Row>8(383) 233-73-73</Row>
                  <Row>8(913) 893-78-11 - whatsapp, Viber</Row>
                </Col>
              </Descriptions.Item>
              <Descriptions.Item label='Часы работы'>
                <Col>
                  <Row>Пн - Пт: 8:30 - 17:30</Row>
                  <Row>Сб - Вс: выходной</Row>
                </Col>
              </Descriptions.Item>
              <Descriptions.Item label='Электронная почта'>
                info@a3c.ru
              </Descriptions.Item>
              <Descriptions.Item label='Адрес'>
                630078 Новосибирск, ул. Выставочная 15/1, корп. 3
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            hoverable
            bordered={false}
            title='Обратная связь'
            actions={[
              <Button onClick={() => form.resetFields()}>Очистить поля</Button>,
              <Button onClick={() => handleSubmit()}>Отправить</Button>,
            ]}
          >
            <Form autoComplete='off' form={form} onFinish={onFinish}>
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item name='name'>
                    <Input placeholder='Ваше имя'></Input>
                  </Form.Item>
                  <Form.Item name='phone'>
                    <Input placeholder='Контактный телефон'></Input>
                  </Form.Item>
                  <Form.Item
                    name='email'
                    rules={[
                      { required: true, message: 'Это поле обязательно' },
                      { type: 'email', message: 'Некорретный email' },
                    ]}
                  >
                    <Input placeholder='Электронная почта'></Input>
                  </Form.Item>
                  <Form.Item
                    name='agreement'
                    valuePropName='checked'
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject(
                                new Error('Нам нужно ваше согласие')
                              ),
                      },
                    ]}
                  >
                    <Checkbox>
                      Я согласен на обработку персональных данных
                    </Checkbox>
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <Form.Item
                    name='message'
                    rules={[
                      { required: true, message: 'Это поле обязательно' },
                    ]}
                  >
                    <TextArea
                      autoSize={{ minRows: 9 }}
                      placeholder='Сообщение'
                    ></TextArea>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
      </div>
    
  );
}
