import { useState } from 'react';

export const formatDate = (date) => {
    if (!(date instanceof Date)) {
        throw new Error('Input must be an instance of Date');
    }

    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
};

// export const useModal = (initialState = false) => {
//     const [visible, setVisible] = useState(initialState);

//     const openModal = () => setVisible(true);
//     const closeModal = () => setVisible(false);
//     const toggleModal = () => setVisible(prev => !prev);

//     return {
//         visible,
//         openModal,
//         closeModal,
//         toggleModal
//     };
// };

export const sortTasksByDate = (tasks, order = 'desc') => {
    return tasks.sort((a, b) => {
        const dateA = a.createdAt.toDate();
        const dateB = b.createdAt.toDate();
        return order === 'desc' ? dateB - dateA : dateA - dateB;
    });
};