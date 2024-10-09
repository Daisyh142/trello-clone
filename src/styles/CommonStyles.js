import styled from 'styled-components';

export const Button = styled.button`
  border: none;
  border-radius: 3px;
  padding: 10px;
  cursor: pointer;
  color: white;
`;

export const SaveButton = styled(Button)`
  background: #5aac44;
`;

export const DeleteButton = styled(Button)`
  background: #e74c3c;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 3px;
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 3px;
  resize: vertical;
`;

export const Section = styled.div`
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h4`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
`;