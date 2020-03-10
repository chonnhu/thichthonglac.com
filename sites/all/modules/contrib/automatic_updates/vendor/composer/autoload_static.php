<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit521321008fc462c9f6b48808ceb7ed29
{
    public static $files = array (
        '5255c38a0faeba867671b61dfda6d864' => __DIR__ . '/..' . '/paragonie/random_compat/lib/random.php',
        '3109cb1a231dcd04bee1f9f620d46975' => __DIR__ . '/..' . '/paragonie/sodium_compat/autoload.php',
    );

    public static $prefixLengthsPsr4 = array (
        'D' => 
        array (
            'Drupal\\Signify\\' => 15,
            'Drupal\\Component\\Version\\' => 25,
        ),
        'C' => 
        array (
            'Composer\\Semver\\' => 16,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Drupal\\Signify\\' => 
        array (
            0 => __DIR__ . '/..' . '/drupal/php-signify/src',
        ),
        'Drupal\\Component\\Version\\' => 
        array (
            0 => __DIR__ . '/..' . '/drupal/core-version',
        ),
        'Composer\\Semver\\' => 
        array (
            0 => __DIR__ . '/..' . '/composer/semver/src',
        ),
    );

    public static $classMap = array (
        'Composer\\Semver\\Comparator' => __DIR__ . '/..' . '/composer/semver/src/Comparator.php',
        'Composer\\Semver\\Constraint\\AbstractConstraint' => __DIR__ . '/..' . '/composer/semver/src/Constraint/AbstractConstraint.php',
        'Composer\\Semver\\Constraint\\Constraint' => __DIR__ . '/..' . '/composer/semver/src/Constraint/Constraint.php',
        'Composer\\Semver\\Constraint\\ConstraintInterface' => __DIR__ . '/..' . '/composer/semver/src/Constraint/ConstraintInterface.php',
        'Composer\\Semver\\Constraint\\EmptyConstraint' => __DIR__ . '/..' . '/composer/semver/src/Constraint/EmptyConstraint.php',
        'Composer\\Semver\\Constraint\\MultiConstraint' => __DIR__ . '/..' . '/composer/semver/src/Constraint/MultiConstraint.php',
        'Composer\\Semver\\Semver' => __DIR__ . '/..' . '/composer/semver/src/Semver.php',
        'Composer\\Semver\\VersionParser' => __DIR__ . '/..' . '/composer/semver/src/VersionParser.php',
        'Drupal\\Component\\Version\\Constraint' => __DIR__ . '/..' . '/drupal/core-version/Constraint.php',
        'Drupal\\Signify\\ChecksumList' => __DIR__ . '/..' . '/drupal/php-signify/src/ChecksumList.php',
        'Drupal\\Signify\\FailedCheckumFilter' => __DIR__ . '/..' . '/drupal/php-signify/src/FailedCheckumFilter.php',
        'Drupal\\Signify\\Verifier' => __DIR__ . '/..' . '/drupal/php-signify/src/Verifier.php',
        'Drupal\\Signify\\VerifierB64Data' => __DIR__ . '/..' . '/drupal/php-signify/src/VerifierB64Data.php',
        'Drupal\\Signify\\VerifierException' => __DIR__ . '/..' . '/drupal/php-signify/src/VerifierException.php',
        'Drupal\\Signify\\VerifierFileChecksum' => __DIR__ . '/..' . '/drupal/php-signify/src/VerifierFileChecksum.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit521321008fc462c9f6b48808ceb7ed29::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit521321008fc462c9f6b48808ceb7ed29::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit521321008fc462c9f6b48808ceb7ed29::$classMap;

        }, null, ClassLoader::class);
    }
}