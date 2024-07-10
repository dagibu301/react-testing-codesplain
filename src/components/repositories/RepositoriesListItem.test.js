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
        language: 'Javascript',
        description: 'A js library',
        owner: 'facebook',
        name: 'react',
        html_url: 'https://github.com/facebook/react'
    }

    it('should show a link for the github repository for this item', async () => {
        render(
            <MemoryRouter>
                <RepositoriesListItem repository={mockRepository} />
            </MemoryRouter>
        );

        await screen.findByRole('img', { name: 'Javascript' });

        const link = screen.getByRole('link', { name: /github repository/i });

        expect(link).toHaveAttribute('href', mockRepository.html_url);
    })
})
