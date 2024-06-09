import React, { useState, useEffect, useRef } from 'react';
import './collaborate.css'


const Collaborate = () => {

    const codeContainerRef = useRef(null);
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        if (codeContainerRef.current) {
            const range = document.createRange();
            range.selectNode(codeContainerRef.current);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            
            try {
                document.execCommand('copy');
                setCopied(true);
                setTimeout(() => {
                    setCopied(false); // Reset copied state after some time
                }, 3000); // Reset after 3 seconds
            } catch (err) {
                console.error('Failed to copy:', err);
                alert('Error copying content');
            }
    
            window.getSelection().removeAllRanges();
        }
    };

    return (

        
        
        <div className="content-collaborate">
            

            <div className="top-sec">
                <h1>Do you want to support the project?</h1>
                <p>We'll give you a detailed guide on how to do It. Follow the next steps!</p>
            </div>
            <div className="pages"> 
            <div className="left-page">
            <div className="sec">
                <h1>Installation</h1>
                <h2>You can install dreXml using:</h2>
                <div className="code-box"><p ref={codeContainerRef}>pip install drexml</p>
                <button className="copy-button" onClick={copyToClipboard}>
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                </div>
            </div>

            <div className="sec">
                <h1>Setup</h1>
                <h2>To install the drexml package use the following:</h2>
                <div className="code-box"><p ref={codeContainerRef}>conda create -n drexml python=3.10 <br></br>
                                             conda activate drexml <br></br>
                                             pip install drexml</p><button className="copy-button" onClick={copyToClipboard}>
                                {copied ? 'Copied!' : 'Copy'}
                            </button></div>
                <h2>If a CUDA&#126;10.2/11.x (&lt; 12) compatible device is available use:</h2>
                <div className="code-box"><p ref={codeContainerRef}>conda create -n drexml --override-channels -c "nvidia/label/cuda-11.8.0" -c conda-forge cuda cuda-nvcc cuda-toolkit gxx=11.2 python=3.10 <br></br>
                                             conda activate drexml <br></br>
                                             pip install --no-cache-dir --no-binary=shap drexml</p><button className="copy-button" onClick={copyToClipboard}>
                                {copied ? 'Copied!' : 'Copy'}
                            </button></div>
                <h2>To install drexml in an existing environment, activate it and use:</h2>
                <div className="code-box"><p ref={codeContainerRef}>pip install drexml</p><button className="copy-button" onClick={copyToClipboard}>
                                {copied ? 'Copied!' : 'Copy'}
                            </button></div>
                <h2>Note that by default the setup will try to compile the CUDA modules, if not possible it will use the CPU modules.</h2>
            </div>

            <div className="sec">
                <h1>Run</h1>
                <h2>To run the program for a disease map that uses circuits from the preprocessed KEGG pathways and the KDT standard list, construct an environment file (e.g. disease.env):</h2>
                <li>using the following template if you have a set of seed genes (comma-separated):</li>
                <div className="code-box"><p ref={codeContainerRef}>seed_genes=2175,2176,2189</p><button className="copy-button" onClick={copyToClipboard}>
                                {copied ? 'Copied!' : 'Copy'}
                            </button></div>
                <li>using the following template if you want to use the DisGeNET [1] curated gene-disease associations as seeds.</li>
                <div className="code-box"><p ref={codeContainerRef}>disease_id="C0015625"</p><button className="copy-button" onClick={copyToClipboard}>
                                {copied ? 'Copied!' : 'Copy'}
                            </button></div>
                <li>using the following template if you know which circuits to include (the disease map):</li>
                <div className="code-box"><p ref={codeContainerRef}>circuits=circuits.tsv.gz</p><button className="copy-button" onClick={copyToClipboard}>
                                {copied ? 'Copied!' : 'Copy'}
                            </button></div>    
                <h2>The TSV file circuits.tsv has the following format (tab delimited):</h2>
                <div className="code-box"><p ref={codeContainerRef}>index	in_disease<br></br>
                                             P-hsa03320-37	0<br></br>
                                             P-hsa03320-61	0<br></br>
                                             P-hsa03320-46	0<br></br>
                                             P-hsa03320-57	0<br></br>
                                             P-hsa03320-64	0<br></br>
                                             P-hsa03320-47	0<br></br>
                                             P-hsa03320-65	0<br></br>
                                             P-hsa03320-55	0<br></br>
                                             P-hsa03320-56	0<br></br>
                                             P-hsa03320-33	0<br></br>
                                             P-hsa03320-58	0<br></br>
                                             P-hsa03320-59	0<br></br>
                                             P-hsa03320-63	0<br></br>
                                             P-hsa03320-44	0<br></br>
                                             P-hsa03320-36	0<br></br>
                                             P-hsa03320-30	0<br></br>
                                             P-hsa03320-28	1</p><button className="copy-button" onClick={copyToClipboard}>
                                {copied ? 'Copied!' : 'Copy'}
                            </button></div>  
                </div>




            </div>
        
            <div className="right-page">
            <div className="sec">
                <h2>where:</h2>
                <li>index: Hipathia circuit id</li>
                <li>in_disease: (boolean) True/1 if a given circuit is part of the disease</li>
                <h2>Note that in all cases you can restrict the circuits to the physiological list by setting use_physio=true in the env <br></br>
                    To run the experiment using 10 CPU cores and 0 GPUs, run the following command within an activated environment:</h2>
                <div className="code-box"><p ref={codeContainerRef}>drexml run --n-gpus 0 --n-cpus 10 $DISEASE_PATH</p><button className="copy-button" onClick={copyToClipboard}>
                                {copied ? 'Copied!' : 'Copy'}
                            </button></div>
                <h2>where:</h2>
                <li>--n-gpus indicates the number of gpu devices to use in parallel (-1 -&gt; all) (0 -&gt; None)</li>
                <li>--n-cpus indicates the number of cpu devices to use in parallel (-1 -&gt; all) 8</li>
                <li>DISEASE_PATH indicates the path to the disease env file (e.g. /path/to/disease/folder/disease.env)</li>
                <h2>Use the --debug option for testing that everything works using a few iterations.</h2>
                <h2>Note that the first time that the full program is run, it will take longer as it downloads the latest versions of each background dataset from Zenodo:</h2>
                <a href="https://doi.org/10.5281/zenodo.6020480"><h2>https://doi.org/10.5281/zenodo.6020480</h2></a>
            </div>
            <div className="sec">
                <h1>Contribute to development</h1>
                <h2>The recommended setup is:</h2>
                <li>setup pipx</li>
                <li>setup miniforge</li>
                <li>use pipx to install pdm</li>
                <li>ensure that pdm is version &gt;=2.1, otherwise update with pipx</li>
                <li>use pipx to inject pdm-bump into pdm</li>
                <li>use pipx to install nox</li>
                <li>run pdm config venv.backend conda</li>
                <li>run make, if you want to use a CUDA enabled GPU, use make gpu=1</li>
                <li>(Recommended): For GPU development, clear the cache using pdm clean cache first</li>
            </div>
            <div className="sec">
                <h1>Documentation</h1>
                <h2>The documentation can be found here:</h2>
                <a href="https://loucerac.github.io/drexml/"><h2>https://loucerac.github.io/drexml/</h2></a>
            </div>
            <div className="sec">
                <h1>References</h1>
                <h2>[1] Janet Piñero, Juan Manuel Ramírez-Anguita, Josep Saüch-Pitarch, Francesco Ronzano, 
                    Emilio Centeno, Ferran Sanz, Laura I Furlong. The DisGeNET knowledge platform for 
                    disease genomics: 2019 update. Nucl. Acids Res. (2019) doi:10.1093/nar/gkz1021</h2>
               
            </div>
            
            </div>
        </div>
</div>
    )
}

export default Collaborate