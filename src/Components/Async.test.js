import { render, screen } from "@testing-library/react";
import Async from "./Async"
import { json } from "react-router-dom";

describe('Async component',()=>{
    test('rendersposts if request succeeds', async () =>{
        window.fetch = jest.fn()
        window.fetch.mockResolvedValueOnce({
            json: async()=>  [{id :'p1', title :'first post'}]
        })
        render(<Async />)

        const listItemElements = await screen.findAllByRole('listitem')
        expect(listItemElements).not.toHaveLength(0);
    })
})