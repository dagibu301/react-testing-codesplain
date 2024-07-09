import { render, screen } from "@testing-library/react";
import RepositoriesSummary from "./RepositoriesSummary";


describe('RepositoriesSummary Component', () => {
    const mockRepository = {
        stargazers_count: 1, open_issues: 2, forks: 3, language: 'JavaScript'
    }

    it('should render a stars icon', () => {
        render(<RepositoriesSummary repository={mockRepository} />);

        const starIcon = screen.getByRole('img', { name: /stars/i });

        expect(starIcon).toBeInTheDocument();
    });

    it('should render JavaScript as primary language', () => {
        render(<RepositoriesSummary repository={mockRepository} />);

        const language = screen.getByText(/JavaScript/i);

        expect(language).toBeInTheDocument();
    });

    it('should display information about the repository', () => {
        render(<RepositoriesSummary repository={mockRepository} />);

        Object.values(mockRepository).forEach(value => {

            const element = screen.getByText(value, { exact: false });
            const element2 = screen.getByText(new RegExp(value));

            expect(element).toBeInTheDocument();
            expect(element2).toBeInTheDocument();
        });
    });
})