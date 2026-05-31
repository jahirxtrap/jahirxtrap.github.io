export interface Library {
  id: string;
  repo: string;
  mavenGroup: string;
  mavenArtifact: string;
  logoPath: string;
  branch: string;
  wikiPages: string[];
  javadocMcVersions?: string[];
}

export const libraries: Library[] = [
  {
    id: 'configlibtxf',
    repo: 'jahirxtrap/configlibtxf',
    mavenGroup: 'io.github.jahirxtrap',
    mavenArtifact: 'configlibtxf',
    logoPath: 'common/src/main/resources/logo.png',
    branch: 'master',
    wikiPages: ['Home', 'Configuration', 'Screen-&-Server-Sync'],
    javadocMcVersions: ['1.20.1', '1.21.1', '1.21.11', '26.1.2'],
  },
  {
    id: 'backstube',
    repo: 'jahirxtrap/backstube',
    mavenGroup: 'io.github.jahirxtrap',
    mavenArtifact: 'backstube',
    logoPath: 'common/src/main/resources/logo.png',
    branch: 'master',
    wikiPages: ['Home', 'Data-Driven', 'Java-API'],
    javadocMcVersions: ['1.20.1', '1.21.1', '1.21.11', '26.1.2'],
  },
  {
    id: 'keybindfixtxf',
    repo: 'jahirxtrap/keybindfixtxf',
    mavenGroup: 'io.github.jahirxtrap',
    mavenArtifact: 'keybindfixtxf',
    logoPath: 'src/main/resources/logo.png',
    branch: 'master',
    wikiPages: ['Home'],
    javadocMcVersions: ['1.18.2'],
  },
];

export const mavenProfileUrl = 'https://central.sonatype.com/namespace/io.github.jahirxtrap';
