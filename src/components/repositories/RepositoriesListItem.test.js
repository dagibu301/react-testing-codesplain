import { render, screen } from "@testing-library/react";
import RepositoriesListItem from "./RepositoriesListItem";
import { MemoryRouter } from "react-router-dom";

/* jest.mock('../tree/FileIcon', () => {
    return () => {
        return 'File Icon Component'
    }
}); */

describe('Repositories List Item component', () => {
    const mockRepository = {
        full_name: 'facebook/react',
        language: 'JavaScript',
        description: 'A js library',
        owner: {
            login: 'facebook',
        },
        name: 'react',
        html_url: 'https://github.com/facebook/react'
    }

    it('should show a link for the github repository for this item', async () => {
        render(
            <MemoryRouter>
                <RepositoriesListItem repository={mockRepository} />
            </MemoryRouter>
        );

        await screen.findByRole('img', { name: 'JavaScript' });

        const link = screen.getByRole('link', { name: /github repository/i });

        expect(link).toHaveAttribute('href', mockRepository.html_url);
    })

    it('should  show a fileicon with the appropiate icon', async () => {
        render(
            <MemoryRouter>
                <RepositoriesListItem repository={mockRepository} />
            </MemoryRouter>
        );

        const icon = await screen.findByRole('img', { name: 'JavaScript' });

        expect(icon).toBeInTheDocument();
        expect(icon).toHaveClass('js-icon');
    })

    it(' should show a link to the code editor page', async () => {
        render(
            <MemoryRouter>
                <RepositoriesListItem repository={mockRepository} />
            </MemoryRouter>
        );

        await screen.findByRole('img', { name: 'JavaScript' });

        const link = await screen.findByRole('link', { name: new RegExp(mockRepository.owner.login) });

        expect(link).toHaveAttribute('href', `/repositories/${mockRepository.full_name}`);
    })
})
