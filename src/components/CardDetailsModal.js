import React, { useState } from 'react';
import styled from 'styled-components';
import { Calendar, Tag, Paperclip, MessageSquare } from 'lucide-react';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 600px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  float: right;
`;

const SaveButton = styled.button`
  background: #5aac44;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 10px;
  cursor: pointer;
  margin-top: 10px;
`;

const DeleteButton = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 10px;
  cursor: pointer;
  margin-top: 10px;
  margin-left: 10px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h4`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 3px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 3px;
  resize: vertical;
`;

const Label = styled.span`
  background: #61bd4f;
  color: white;
  padding: 2px 8px;
  border-radius: 3px;
  margin-right: 5px;
  cursor: pointer;
`;

const Comment = styled.div`
  background: #f4f5f7;
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 10px;
`;

const CardDetailsModal = ({ card, onClose, onSave, deleteCard }) => {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || '');
  const [dueDate, setDueDate] = useState(card.dueDate || '');
  const [labels, setLabels] = useState(card.labels || []);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(card.comments || []);
  const [attachments, setAttachments] = useState(card.attachments || []);

  const handleSave = () => {
    onSave(card.id, {
      title,
      description,
      dueDate,
      labels,
      comments,
      attachments,
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      deleteCard(card.id);
      onClose();
    }
  };

  const addComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { text: newComment, timestamp: new Date().toISOString() }]);
      setNewComment('');
    }
  };

  const addAttachment = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachments([...attachments, { name: file.name, size: file.size }]);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        
        <Section>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Card Title"
          />
        </Section>

        <Section>
          <SectionTitle>
            <Calendar size={16} />
            Due Date
          </SectionTitle>
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </Section>

        <Section>
          <SectionTitle>
            <Tag size={16} />
            Labels
          </SectionTitle>
          {labels.map((label, index) => (
            <Label key={index} onClick={() => setLabels(labels.filter((_, i) => i !== index))}>
              {label}
            </Label>
          ))}
          <Input
            placeholder="Add new label"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                setLabels([...labels, e.target.value.trim()]);
                e.target.value = '';
              }
            }}
          />
        </Section>

        <Section>
          <SectionTitle>Description</SectionTitle>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a more detailed description..."
            rows="4"
          />
        </Section>

        <Section>
          <SectionTitle>
            <Paperclip size={16} />
            Attachments
          </SectionTitle>
          {attachments.map((attachment, index) => (
            <div key={index}>{attachment.name} ({Math.round(attachment.size / 1024)} KB)</div>
          ))}
          <input type="file" onChange={addAttachment} />
        </Section>

        <Section>
          <SectionTitle>
            <MessageSquare size={16} />
            Comments
          </SectionTitle>
          {comments.map((comment, index) => (
            <Comment key={index}>
              <div>{comment.text}</div>
              <small>{new Date(comment.timestamp).toLocaleString()}</small>
            </Comment>
          ))}
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            rows="2"
          />
          <SaveButton onClick={addComment}>Add Comment</SaveButton>
        </Section>

        <SaveButton onClick={handleSave}>Save Changes</SaveButton>
        <DeleteButton onClick={handleDelete}>Delete Card</DeleteButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CardDetailsModal;