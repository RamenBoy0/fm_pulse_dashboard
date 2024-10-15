import React, { useState } from 'react'
import { read, utils, writeFile } from 'xlsx'


const ImportXlsx = () => {
    const [tenders, setTenders] = useState([]);

    const handleImport = $event => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = event => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const ros = utils.sheet_to_json(wb.Sheets[sheets[0]]);
    
                }
            }
        }
    }

}