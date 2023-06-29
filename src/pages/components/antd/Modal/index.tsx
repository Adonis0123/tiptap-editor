import React from 'react';
import { Modal } from 'antd';

import styles from './index.module.scss';

import type { ModalProps } from 'antd';
import cls from '@/pages/utils/cls';

export type { ModalProps };

const CloseSvg = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 16L16 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 16L8 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

type TInternalModal = typeof Modal;
interface IInternalModal extends TInternalModal {
  displayName: string;
  useModal: typeof Modal.useModal;
  destroyAll: typeof Modal.destroyAll;
  config: typeof Modal.config;
}

const InternalModal = ((props?: ModalProps) => {
  const { wrapClassName, ...other } = props || {};
  return (
    <Modal
      wrapClassName={cls`
        ${styles.modal}
        ${wrapClassName}
      `}
      closeIcon={
        <CloseSvg
          className={cls`
            w-6 h-6 text-display-secondary
          `}
        />
      }
      {...other}
    />
  );
}) as any as IInternalModal;

InternalModal.displayName = 'InternalModal';

InternalModal.useModal = Modal.useModal;
InternalModal.destroyAll = Modal.destroyAll;
InternalModal.config = Modal.config;
InternalModal.confirm = Modal.confirm;

export default InternalModal;
