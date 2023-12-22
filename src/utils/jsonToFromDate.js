import { serialize } from 'object-to-formdata';

export default function jsonToFormData(object) {
  return serialize(object);
}
