import React from 'react'
import Modal from './ui/modal'
import { Button } from './button'

const SaveModal = ({ title, description, isOpen, onClose, children,loading, onConfirm }) => {
 return (
    <Modal
      title="Are you sure?"
      description="This action cannot be undone you can't edit or re-answer this question again!"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant={"outline"} onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={loading}
         className="bg-emerald-600 hover:bg-emerald-800"
          onClick={onConfirm}
        >
          Continue
        </Button>
      </div>
    </Modal>
  );
};
export default SaveModal