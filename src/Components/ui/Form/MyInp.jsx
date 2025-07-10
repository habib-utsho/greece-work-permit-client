/* eslint-disable react/prop-types */
import { LockOutlined } from "@ant-design/icons";
import { Form, Input, Select, Radio } from "antd";
import { PhoneInput } from "react-international-phone";

const MyInp = ({
  type,
  placeholder,
  name,
  label,
  rules,
  options = [],
  onChange,
  defaultValue,
  disabled,
  size,
  prefix,
  readOnly,
  className,
  inpClassName,
  multiple,
  isUpdate,
}) => {
  // File input special case
  console.log({ isUpdate });
  if (isUpdate && type === "file") return;
  if (type === "file") {
    return (
      <Form.Item
        name={name}
        label={label}
        className={`w-full min-w-[100px] ${className}`}
        rules={rules}
        layout="vertical"
        valuePropName="file"
        getValueFromEvent={(e) => {
          return e?.target?.files?.[0]; // ✅ return actual File object
        }}
      >
        <Input
          type="file"
          disabled={disabled}
          className={inpClassName}
          accept="image/*"
        />
      </Form.Item>
    );
  }

  return (
    <Form.Item
      name={name}
      className={`w-full min-w-[100px] ${className}`}
      label={label}
      rules={rules}
      layout="vertical"
    >
      {type === "select" ? (
        <Select
          size={size}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          mode={multiple ? "multiple" : undefined}
          showSearch
          className={"!border-none !border-0"}
          filterOption={(input, option) =>
            // option.children.toLowerCase().includes(input.toLowerCase())
            option?.label?.toLowerCase()?.includes(input?.toLowerCase())
          }
          options={options?.map((opt) => ({
            label: opt?.label,
            value: opt?.value,
          }))}
          /* {options.map((opt) => (
            <Select.Option key={opt.value} value={opt.value}>
              {opt.label}
            </Select.Option>
          ))}
        </Select> */
        />
      ) : type === "radio" ? (
        <Radio.Group disabled={disabled} onChange={onChange}>
          {options.map((opt) => (
            <Radio key={opt.value} value={opt.value}>
              {opt.label}
            </Radio>
          ))}
        </Radio.Group>
      ) : type === "phone" ? (
        <PhoneInput
          defaultCountry="bd"
          value={defaultValue}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          size={size}
        />
      ) : type === "password" ? (
        <Input.Password
          disabled={disabled}
          size={size}
          placeholder={placeholder}
          prefix={prefix || <LockOutlined />}
          className={inpClassName}
        />
      ) : type === "textarea" ? (
        <Input.TextArea
          disabled={disabled}
          size={size}
          placeholder={placeholder}
          className={inpClassName}
        />
      ) : (
        <Input
          disabled={disabled}
          size={size}
          type={type}
          placeholder={placeholder}
          className={inpClassName}
        />
      )}
    </Form.Item>
  );
};

export default MyInp;
