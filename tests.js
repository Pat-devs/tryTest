// Test configuration
const tests = {
    sum: {
        description: "Should add two numbers",
        tests: [
            { args: [1, 2], expected: 3 },
            { args: [-1, 5], expected: 4 },
            { args: [0, 0], expected: 0 }
        ]
    },
    isEven: {
        description: "Should check if number is even",
        tests: [
            { args: [4], expected: true },
            { args: [7], expected: false },
            { args: [0], expected: true }
        ]
    }
};

// Test runner
function runTests() {
    const resultsDiv = document.getElementById('results');
    
    for (const [funcName, config] of Object.entries(tests)) {
        const testContainer = document.createElement('div');
        testContainer.className = 'test-case';
        testContainer.innerHTML = `<h3>Testing ${funcName}</h3><p>${config.description}</p>`;
        
        let allPassed = true;
        
        config.tests.forEach((testCase, i) => {
            const testElement = document.createElement('div');
            testElement.className = 'test';
            
            try {
                const result = window[funcName](...testCase.args);
                const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
                
                testElement.innerHTML = `
                    <span class="status">${passed ? '✓' : '✗'}</span>
                    Test ${i + 1}: ${passed ? 'Passed' : 'Failed'}
                    <br>
                    <small>
                        Input: ${JSON.stringify(testCase.args)} 
                        | Expected: ${JSON.stringify(testCase.expected)}
                        | Received: ${JSON.stringify(result)}
                    </small>
                `;
                
                testElement.className += passed ? ' pass' : ' fail';
                allPassed = allPassed && passed;
            } catch (error) {
                testElement.innerHTML = `
                    <span class="status">✗</span>
                    Test ${i + 1} Error: ${error.message}
                `;
                testElement.className += ' fail';
                allPassed = false;
            }
            
            testContainer.appendChild(testElement);
        });
        
        testContainer.style.border = `2px solid ${allPassed ? 'green' : 'red'}`;
        resultsDiv.appendChild(testContainer);
    }
}

// Run tests when page loads
window.addEventListener('load', runTests);