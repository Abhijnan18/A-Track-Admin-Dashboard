import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CSVReaderComponent from '../../components/CSVReader/CSVReader'; // Adjust import path if necessary
import DefaultLayout from '../../layout/DefaultLayout';

const CSVR: React.FC = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="CSVReader" />
            <div className="flex flex-col gap-10">
                <CSVReaderComponent />
            </div>
        </DefaultLayout>
    );
};

export default CSVR;
