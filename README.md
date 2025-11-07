![alt text](icon/icon-64.png "Indice logo")
# Indice.Angular 
[![publish](https://github.com/indice-co/Indice.Angular/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/indice-co/Indice.Angular/actions/workflows/npm-publish.yml)

A collection of Angular libraries providing authentication, configuration, and reusable components for Angular v20+ applications.

## Libraries

| Library | NPM Version | Description |
|---------|-------------|-------------|
| [@indice/ng-config](https://www.npmjs.com/package/@indice/ng-config) | ![NPM Version](https://img.shields.io/npm/v/%40indice%2Fng-config) | Indice dynamic runtime configuration provider for applications |
| [@indice/ng-auth](https://www.npmjs.com/package/@indice/ng-auth) | ![NPM Version](https://img.shields.io/npm/v/%40indice%2Fng-auth) | Indice extensions for Angular v20 using oidc-client-ts for OpenID Connect authentication |
| [@indice/ng-components](https://www.npmjs.com/package/@indice/ng-components) | ![NPM Version](https://img.shields.io/npm/v/%40indice%2Fng-components) | Indice common components for Angular v20 with Tailwind CSS integration |

## Prerequisites

- Angular 20+
- Node.js 22.19+
- TypeScript 5.9+

## Installation

Install the libraries you need via npm:

```bash
# Configuration library
npm install @indice/ng-config

# Authentication library  
npm install @indice/ng-auth oidc-client-ts

# Components library
npm install @indice/ng-components tailwindcss @indice/ng-auth
```

## Quick Start

### ng-config
Provides dynamic runtime configuration for Angular applications.

```typescript
import { NgConfigModule } from '@indice/ng-config';

@NgModule({
  imports: [NgConfigModule.forRoot()]
})
export class AppModule { }
```

### ng-auth
Authentication and authorization using OpenID Connect.

```typescript
import { NgAuthModule } from '@indice/ng-auth';

@NgModule({
  imports: [NgAuthModule.forRoot({
    authority: 'https://your-identity-server.com',
    client_id: 'your-client-id',
    // additional OIDC configuration
  })]
})
export class AppModule { }
```

### ng-components
Reusable Angular components with Tailwind CSS styling.

```typescript
import { NgComponentsModule } from '@indice/ng-components';

@NgModule({
  imports: [NgComponentsModule]
})
export class AppModule { }
```

## Development

### Prerequisites
- Node.js 22.19+ (as specified in the GitHub workflow)
- Angular CLI 20+

### Setup
```bash
# Clone the repository
git clone https://github.com/indice-co/Indice.Angular.git
cd Indice.Angular

# Install dependencies
npm install

# Build all libraries
npm run build-auth
npm run build-components  
npm run build-config
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the development server |
| `npm run build-auth` | Build the ng-auth library |
| `npm run build-components` | Build the ng-components library |
| `npm run build-config` | Build the ng-config library |
| `npm run publish-auth` | Publish ng-auth to npm |
| `npm run publish-components` | Publish ng-components to npm |
| `npm run publish-config` | Publish ng-config to npm |
| `npm run publish-auth-beta` | Publish ng-auth beta version |
| `npm run publish-components-beta` | Publish ng-components beta version |

## Project Structure

```
Indice.Angular/
├── projects/
│   ├── ng-auth/          # Authentication library
│   ├── ng-components/    # Components library  
│   ├── ng-config/        # Configuration library
│   └── app/              # Demo application
├── dist/                 # Built libraries
├── .github/workflows/    # CI/CD workflows
└── icon/                 # Project assets
```

## Dependencies

### Peer Dependencies
All libraries require:
- `@angular/common >= 20.0.0`
- `@angular/core >= 20.0.0`
- `rxjs >= 7.8.1`

Additional dependencies per library:
- **ng-auth**: `oidc-client-ts >= 3.0.1`, `@angular/router >= 20.0.0`
- **ng-components**: `tailwindcss ^4.1.16`, `@indice/ng-auth >= 0.4.0`, `uuid >= 13.0.0`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Build and test your changes
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Publishing

Libraries are published to npm using GitHub Actions. The workflow can be triggered manually via the GitHub Actions interface.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Links

- [NPM Organization](https://www.npmjs.com/org/indice)
- [Issues](https://github.com/indice-co/Indice.Angular/issues)
- [Indice Website](https://indice.gr)

---

© 2021-2024 Indice. All rights reserved.


