import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomeRoute from "./HomeRoute";
import { createServer } from "../test/server";


createServer([
    {
        path: '/api/repositories',
        method: 'get',
        res: (req) => {
            const language = req.url.searchParams.get('q').split('language:')[1];
            return {
                items: [
                    {
                        id: 1,
                        full_name: `${language}_1`,
                    },
                    {
                        id: 2,
                        full_name: `${language}_2`,
                    },
                ]
            }
        }
    }
])

describe('Home Route component', () => {
    it('should render two links for each language', async () => {
        render(
            <MemoryRouter>
                <HomeRoute />
            </MemoryRouter>
        );

        const languages = [
            'javascript',
            'typescript',
            'rust',
            'go',
            'python',
            'java'
        ]

        for (const language of languages) {
            const links = await screen.findAllByRole('link', { name: new RegExp(`${language}_`) });

            expect(links).toHaveLength(2);
            expect(links[0]).toHaveTextContent(`${language}_1`);
            expect(links[1]).toHaveTextContent(`${language}_2`);
            expect(links[0]).toHaveAttribute('href', `/repositories/${language}_1`);
            expect(links[1]).toHaveAttribute('href', `/repositories/${language}_2`);
        }
    });
});
