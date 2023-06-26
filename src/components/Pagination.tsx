interface PaginationProps {
    currentPage: number;
    dataLenght?: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, dataLenght = 10, onPageChange }) => {
    const isFirstPage = currentPage === 1;
    const isLastPage = 10 > dataLenght;

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= dataLenght) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex items-center justify-center space-x-2">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={isFirstPage}
                className={`px-4 py-2 rounded-md ${isFirstPage ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
            >
                Anterio
            </button>

            <span className="px-4 py-2 bg-gray-300 rounded-md">
                Página {currentPage}
            </span>

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={isLastPage}
                className={`px-4 py-2 rounded-md ${isLastPage ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
            >
                Próximo
            </button>
        </div>
    );
};

export default Pagination;