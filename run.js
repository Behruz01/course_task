const { execSync } = require('child_process');

try {
  execSync('git clone https://github.com/Behruz01/course_task', {
    stdio: 'inherit',
  });

  process.chdir('course_task');

  execSync('npm install', { stdio: 'inherit' });

  execSync('npm run start:dev', { stdio: 'inherit' });
} catch (error) {
  console.error('Xatolik yuz berdi:', error);
}
