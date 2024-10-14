import React, { useState } from 'react';
import styled from 'styled-components';
import { X, Users, Tag, CheckSquare, Calendar, Paperclip, Image, List, Plus, ArrowRight, Copy, Layout, Archive, Share, Eye, Monitor, AlignLeft } from 'lucide-react';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #1e2a3a;
  border-radius: 3px;
  width: 768px;
  max-width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  color: #ecf0f1;
  display: flex;
  position: relative;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
`;

const Sidebar = styled.div`
  width: 200px;
  padding: 12px 12px 12px 0;
  background-color: #1e2a3a;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 220px;
  background: none;
  border: none;
  color: #ecf0f1;
  cursor: pointer;
  font-size: 1.5em;
  z-index: 10;
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const TitleIcon = styled.div`
  margin-right: 10px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.5em;
  font-weight: bold;
  color: #ecf0f1;
`;

const SubTitle = styled.div`
  font-size: 0.9em;
  color: #8795a1;
  margin-bottom: 15px;
  margin-left: 26px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 0.9em;
  color: #8795a1;
  margin-bottom: 10px;
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
  }
`;

const SectionContent = styled.div`
  margin-left: 26px;
`;

const Description = styled.div`
  background-color: #263545;
  border-radius: 3px;
  padding: 10px;
  color: #8795a1;
  font-size: 0.9em;
  min-height: 60px;
`;

const CommentInput = styled.textarea`
  width: 100%;
  min-height: 60px;
  background-color: #263545;
  border: none;
  border-radius: 3px;
  color: #8795a1;
  padding: 10px;
  resize: vertical;
  font-size: 0.9em;
`;

const SidebarButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #263545;
  border: none;
  border-radius: 3px;
  color: #ecf0f1;
  padding: 8px;
  cursor: pointer;
  width: 100%;
  text-align: left;
  font-size: 0.9em;
  margin-bottom: 4px;

  svg {
    margin-right: 8px;
  }

  &:hover {
    background-color: #324b66;
  }
`;

const WatchButton = styled(SidebarButton)`
  width: auto;
  display: inline-flex;
`;

const SidebarSectionTitle = styled.h4`
  font-size: 0.75em;
  color: #8795a1;
  margin: 15px 0 5px;
  text-transform: uppercase;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  background-color: #3498db;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  color: white;
  font-weight: bold;
  font-size: 0.9em;
`;

const ShowDetailsButton = styled.button`
  background: none;
  border: none;
  color: #8795a1;
  cursor: pointer;
  font-size: 0.9em;
  margin-left: auto;
`;

const CardDetailsModal = ({ card, listTitle, onClose, onSave, deleteCard }) => {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || '');
  const [comment, setComment] = useState('');

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}><X size={20} /></CloseButton>
        <MainContent>
          <TitleSection>
            <TitleIcon><Monitor size={20} /></TitleIcon>
            <Title>{title}</Title>
          </TitleSection>
          <SubTitle>in list {listTitle}</SubTitle>
          <Section>
            <SectionContent>
              <SectionTitle>Notifications</SectionTitle>
              <WatchButton><Eye size={16} /> Watch</WatchButton>
            </SectionContent>
          </Section>
          <Section>
            <SectionTitle><AlignLeft size={16} /> Description</SectionTitle>
            <SectionContent>
              <Description
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => setDescription(e.target.innerHTML)}
                dangerouslySetInnerHTML={{ __html: description || 'Add a more detailed description...' }}
              />
            </SectionContent>
          </Section>
          <Section>
            <SectionTitle>
              <List size={16} /> Activity
              <ShowDetailsButton>Show details</ShowDetailsButton>
            </SectionTitle>
            <ActivityItem>
              <Avatar>U</Avatar>
              <ActivityContent>
                <CommentInput
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </ActivityContent>
            </ActivityItem>
            <ActivityItem>
              <Avatar>U</Avatar>
              <ActivityContent>
                <div>User added this card to {listTitle}</div>
                <small style={{ color: '#8795a1' }}>Oct 12, 2024, 11:31 PM</small>
              </ActivityContent>
            </ActivityItem>
          </Section>
        </MainContent>
        <Sidebar>
          <SidebarButton><Users size={16} /> Join</SidebarButton>
          <SidebarButton><Users size={16} /> Members</SidebarButton>
          <SidebarButton><Tag size={16} /> Labels</SidebarButton>
          <SidebarButton><CheckSquare size={16} /> Checklist</SidebarButton>
          <SidebarButton><Calendar size={16} /> Dates</SidebarButton>
          <SidebarButton><Paperclip size={16} /> Attachment</SidebarButton>
          <SidebarButton><Image size={16} /> Cover</SidebarButton>
          <SidebarButton><List size={16} /> Custom Fields</SidebarButton>
          <SidebarSectionTitle>Power-Ups</SidebarSectionTitle>
          <SidebarButton><Plus size={16} /> Add Power-Ups</SidebarButton>
          <SidebarSectionTitle>Automation</SidebarSectionTitle>
          <SidebarButton><Plus size={16} /> Add button</SidebarButton>
          <SidebarSectionTitle>Actions</SidebarSectionTitle>
          <SidebarButton><ArrowRight size={16} /> Move</SidebarButton>
          <SidebarButton><Copy size={16} /> Copy</SidebarButton>
          <SidebarButton><Layout size={16} /> Make template</SidebarButton>
          <SidebarButton><Archive size={16} /> Archive</SidebarButton>
          <SidebarButton><Share size={16} /> Share</SidebarButton>
        </Sidebar>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CardDetailsModal;